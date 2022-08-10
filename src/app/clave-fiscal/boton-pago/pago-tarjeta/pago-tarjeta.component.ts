import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Subject, Subscription} from "rxjs";
import {BlockUI, NgBlockUI} from "ng-block-ui";
import {CtaCteUnificadaService} from "../../cta-cte-unificada/cta-cte-unificada.service";
import {AuthenticationService} from "../../../authentication/signin/authentication.service";
import {DynamicScriptLoaderService} from "../../../dynamic-script-loader-service.service";
import * as moment from "moment";
import { v1 as uuidv1 } from 'uuid';
import {PagoTarjetaService} from "./pago-tarjeta.service";
import * as FileSaver from 'file-saver';
import {Router} from "@angular/router";
import {BlockableUI} from "primeng";
import {MEDIO_PAGO_BOLETA, MEDIO_PAGO_TARJETA} from "../../cta-cte-unificada/tabla-deudas.component";


declare const $: any;
declare const DataTables: any;


@Component({
  selector: 'app-pago-tarjeta-inicio',
  templateUrl: './pago-tarjeta.component.html',
  styleUrls: ['./pago-tarjeta.component.scss']
})
export class PagoTarjetaComponent implements OnInit, OnDestroy {

  loading = false;
  submitted = false;
  consultaObligacionesSubscription: Subscription;
  generarDetallesVtosSubscription: Subscription;
  imprimirSubscription: Subscription;
  errorDominio;
  errorGeneral;
  activeTab;
  tabs = [];

  deudasSelected = {};
  totalPagar = '0.00';
  loadingPagarTarjeta = false;
  loadingImprimir = false;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any>;

  mostrarCtaCteUnificada = true;
  mostrarFormularioTarjeta = false;
  mostrarFinalizacion = false;
  personaId;
  secuencia;
  mensajeExitoso;
  cabeceraId;
  volverClicked = false;
  medioPago = MEDIO_PAGO_TARJETA;
  fechaPago;

  @ViewChild('blockable', {static: false}) blockableEl: HTMLElement;

  constructor(
    private ctaCteUnificadaService: CtaCteUnificadaService,
    private authService: AuthenticationService,
    private fb: FormBuilder,
    private dynamicScriptLoader: DynamicScriptLoaderService,
    private pagoTarjetaService: PagoTarjetaService,
    private router: Router
  ) {
    moment.locale('es');
  }

  ngOnInit() {
    this.personaId = this.authService.getSessionUserId();
  }

  ngOnDestroy(): void {
    if (this.consultaObligacionesSubscription) {
      this.consultaObligacionesSubscription.unsubscribe();
    }
    if (this.generarDetallesVtosSubscription) {
      this.generarDetallesVtosSubscription.unsubscribe();
    }
    if (this.imprimirSubscription) {
      this.imprimirSubscription.unsubscribe();
    }
    if (this.dtTrigger) {
      this.dtTrigger.unsubscribe();
    }
  }


  generarDetallesVencimientos(deuda) {
    this.totalPagar = deuda.totalPagar;
    this.fechaPago = deuda.fechaPago;
    this.secuencia = undefined;
    this.loadingPagarTarjeta = true;
    let detalles = [];
    const deudas: any = Object.values(deuda.deudasSelected);
    for (let deuda of deudas) {
      if (deuda.length > 0) {
        detalles = detalles.concat(deuda);
      }
    }

    const body = {
      fechaPago: deuda.fechaPago,
      detalles: detalles,
      personaId: this.personaId
    };
    this.generarDetallesVtosSubscription = this.pagoTarjetaService.generarDetallesVtos(body)
      .subscribe((response) => {
        console.log(response);
        if(response.error) {
          this.errorGeneral = 'Hubo un error al procesar la deuda.'
          this.loadingPagarTarjeta = false;
        } else {
          // MUESTRO EL FORMULARIO PARA PAGAR CON TARJETA
          this.loadingPagarTarjeta = false;
          this.mostrarCtaCteUnificada = false;
          this.mostrarFormularioTarjeta = true;
          this.mostrarFinalizacion = false;
          this.secuencia = response.secuencia;
        }
      });
  }

  volver() {
    this.volverClicked = true;
    this.mostrarCtaCteUnificada = true;
    this.mostrarFormularioTarjeta = false;
    this.mostrarFinalizacion = false;
  }

  onPagoExitoso(result) {
    console.log('RESULT onPagoExitoso:', JSON.stringify(result));
    console.log('result form pago tarejta', result);
    console.log('resultCP.amount:', +result.amount);
    console.log('this.totalPagar:', +this.totalPagar);
    // REGISTRO CAB Y DETALLES DEL PAGO
    const body = {
      personaId: this.personaId,
      fechaPago: this.fechaPago,
      secuencia: this.secuencia,
      tipoImponible: null,
      claveImponible: null,
      impuesto: null,
      concepto: null,
      amountOrig: this.totalPagar,
      amount:  result.amount,
      resultado: result,
      numeroTarjeta: result.numeroTarjeta,
      cuotas: result.installments,
      email: result.email,
      tipoTarjeta: result.tipoTarjeta
    };
    this.generarDetallesVtosSubscription = this.pagoTarjetaService.registrarPago(body)
      .subscribe((response) => {
        console.log(response);
        this.cabeceraId = response.cabeceraId;
        this.mostrarCtaCteUnificada = false;
        this.mostrarFormularioTarjeta = false;
        this.mostrarFinalizacion = true;
        this.volverClicked = false;
        this.mensajeExitoso = 'Su pago se ha registrado exitosamente. <br/>En los próximos minutos recibirá un correo electrónico con la Confirmación de Pago.'
      });
    this.loadingPagarTarjeta = false;
  }

  imprimirComprobante() {
    this.loadingImprimir = true;
    const body = {
      cabeceraId: this.cabeceraId,
    };
    this.imprimirSubscription = this.pagoTarjetaService.imprimirComprobantePagoTarjeta(body)
      .subscribe((response: any) => {
        this.loading = false;
        const blob = new Blob([response], {
          type: 'application/pdf'
        });
        FileSaver.saveAs(blob, `constancia_pago_tarjeta_${this.cabeceraId}.pdf`);
        this.loadingImprimir = false;
      });
  }

  finalizar() {
    this.router.navigate(['/clave-fiscal/inicio']);
  }

  nuevoPago() {
    this.mostrarCtaCteUnificada = true;
    this.mostrarFormularioTarjeta = false;
    this.mostrarFinalizacion = false;
    // this.consultarObligaciones();
  }
}
