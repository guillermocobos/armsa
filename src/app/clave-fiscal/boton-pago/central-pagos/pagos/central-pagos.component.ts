import {Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subject, Subscription} from 'rxjs';
// import {BlockUI, NgBlockUI} from 'ng-block-ui';

import * as moment from 'moment';


import * as FileSaver from 'file-saver';
import {Router} from '@angular/router';
import {BlockableUI} from 'primeng';

import { DebitoAutomaticoModel } from '../../../../models/debito-automatico.model';
import { BotonPagoService } from '../../boton-pago.service';
import { MEDIO_PAGO_TARJETA } from '../../../../clave-fiscal/cta-cte-unificada/tabla-deudas.component';
import { CtaCteUnificadaService } from '../../../../clave-fiscal/cta-cte-unificada/cta-cte-unificada.service';
import { AuthenticationService } from '../../../../authentication/signin/authentication.service';
import { DynamicScriptLoaderService } from '../../../../dynamic-script-loader-service.service';
import { PagoTarjetaService } from '../../pago-tarjeta/pago-tarjeta.service';
import { PagoMisCuentasService } from './pagomiscuentas/pagomiscuentas.service';
import { MEDIO_PAGO_GENERICO } from '../../../cta-cte-unificada/tabla-deudas.component';



declare const $: any;
declare const DataTables: any;


@Component({
  selector: 'app-pago-tarjeta-inicio',
  templateUrl: './central-pagos.component.html',
  styleUrls: ['./central-pagos.component.scss']
})
export class CentralPagosComponent implements OnInit, OnDestroy {

  loading = false;
  submitted = false;
  consultaObligacionesSubscription: Subscription;
  generarDetallesVtosSubscription: Subscription;
  generarCabeceraPagoSubscription: Subscription;
  imprimirSubscription: Subscription;
  errorDominio;
  errorGeneral;
  activeTab;
  tabs = [];
  mostrarMediosPago = false;

  deudasSelected = {};
  totalPagar = '0.00';
  loadingPagarTarjeta = false;
  loadingImprimir = false;
  loadingPagomiscuentas = false;
  @Output() onCancelar = new EventEmitter();

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any>;

  mostrarCtaCteUnificada = true;
  mostrarFormularioTarjeta = false;
  mostrarFinalizacion = false;
  mostrarModalInterbanking = false;
  mostrarModalOpem = false;
  mostrarFinalizacionInterbanking = false;
  mostrarFinalizacionOpem = false;
  mostrarPagomiscuentas = false;
  mostrarFinalizacionPagomiscuentas = false;
  personaId;
  secuencia;
  mensajeExitoso;
  cabeceraId;
  volverClicked = false;
  medioPago = MEDIO_PAGO_GENERICO;
  //medioPago = MEDIO_PAGO_TARJETA;
  fechaPago;
  cbu;
  NUMERO_CBU;
  listaCbu;
  detalles = [];
  tipoTarjeta;
  debitoAutomatico : DebitoAutomaticoModel[] = [];
  numeroOpe;


  @ViewChild('blockable', {static: false}) blockableEl: HTMLElement;
  @ViewChild('modalInterbanking', {static: false}) modalInterbanking: ElementRef;
  @ViewChild('modalOpem', {static: false}) modalOpem: ElementRef;

  constructor(
    private ctaCteUnificadaService: CtaCteUnificadaService,
    private authService: AuthenticationService,
    private fb: FormBuilder,
    private dynamicScriptLoader: DynamicScriptLoaderService,
    private pagoTarjetaService: PagoTarjetaService,
    private botonPagoService: BotonPagoService,
    private router: Router,
    private pagomiscuentasService: PagoMisCuentasService
  ) {
    moment.locale('es');
  }

  ngOnInit() {
    this.personaId = this.authService.getSessionUserId();
    this.seleccionarCbu();
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
    if (this.generarCabeceraPagoSubscription) {
      this.generarCabeceraPagoSubscription.unsubscribe();
    }
  }

  muestraCentralPagos(deuda){
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
    this.detalles = detalles;
    const body = {
      fechaPago: deuda.fechaPago,
      detalles: detalles,
      personaId: this.personaId
    };

    this.generarDetallesVtosSubscription = this.pagoTarjetaService.generarDetallesVtos(body)
      .subscribe((response) => {
        if(response.error) {
          this.errorGeneral = 'Hubo un error al procesar la deuda.'
          this.loadingPagarTarjeta = false;
        } else {
          // MUESTRO EL FORMULARIO PARA PAGAR CON TARJETA
          this.mostrarMediosPago = true;
          this.mostrarCtaCteUnificada = false;
          this.mostrarFinalizacion = false;
          this.secuencia = response.secuencia;
        }
      });
  }


  generarDetallesVencimientos(tarjeta) {

    //localStorage.setItem('tipoTarjeta', tarjeta);
    this.tipoTarjeta = tarjeta;

    this.mostrarMediosPago = false;

    this.loadingPagarTarjeta = true;


    const body = {
      fechaPago: this.fechaPago,
      detalles: this.detalles,
      personaId: this.personaId
    };
    this.generarDetallesVtosSubscription = this.pagoTarjetaService.generarDetallesVtos(body)
      .subscribe((response) => {
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

  /*generarDetallesVencimientosPagomiscuentas() {

    this.mostrarMediosPago = false;
    this.mostrarCtaCteUnificada = false;
    this.mostrarPagomiscuentas = true;
    this.mostrarFinalizacion = false;
  }*/

  generarDetallesVencimientosPagomiscuentas(pagomiscuentas) {

    this.mostrarMediosPago = false;
    this.mostrarCtaCteUnificada = false;
    this.mostrarPagomiscuentas = true;
    this.mostrarFinalizacion = false;
    const body = {
      fechaPago: this.fechaPago,
      detalles: this.detalles,
      personaId: this.personaId
    };
    this.generarDetallesVtosSubscription = this.pagomiscuentasService.generarDetallesVtos(body)
    .subscribe((response) => {
      if(response.error) {
        this.errorGeneral = 'Hubo un error al procesar la deuda.'
        this.loadingPagomiscuentas = false;
      } else {
        this.loadingPagomiscuentas = false;
        this.mostrarCtaCteUnificada = false;
        this.mostrarPagomiscuentas = true;
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
    this.mostrarPagomiscuentas = false;
  }

  onPagoExitoso(result) {

    console.log('result desde central de pagos', result);
    console.log('RESULT onPagoExitoso', result);
   console.log('secuencia', result.installments);
   // REGISTRO CAB Y DETALLES DEL PAGO
    const body = {
      personaId: this.personaId,
      fechaPago: this.fechaPago,
      secuencia: this.secuencia -1,
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

  imprimirConstanciaBanelco() {
    this.loadingImprimir = true;
    const body = {
      numeroOperacion: this.cabeceraId,
    };
    this.imprimirSubscription = this.pagomiscuentasService.imprimirConstanciaBanelco(body)
      .subscribe((response: any) => {
        this.loading = false;
        const blob = new Blob([response], {
          type: 'application/pdf'
        });
        FileSaver.saveAs(blob, `constancia_banelco_${this.cabeceraId}.pdf`);
        this.loadingImprimir = false;
      });
  }

  imprimirComprobanteProvisorioOpe() {
    this.loadingImprimir = true;
    const body = {
      numeroOpe: this.numeroOpe,
    };
    this.imprimirSubscription = this.botonPagoService.imprimirComprobanteProvisorioOpe(body)
        .subscribe((response: any) => {
        this.loading = false;
        const blob = new Blob([response], {
          type: 'application/pdf'
        });
        FileSaver.saveAs(blob, `constancia_provisoria_ope_${this.numeroOpe}.pdf`);
        this.loadingImprimir = false;
      });
  }

  finalizar() {
    this.onCancelar.emit(true);
    this.router.navigate(['/clave-fiscal/inicio']);
  }

  nuevoPago() {
    this.mostrarMediosPago = false;
    this.mostrarCtaCteUnificada = true;
    this.mostrarFormularioTarjeta = false;
    this.mostrarFinalizacion = false;
    this.mostrarFinalizacionInterbanking = false;
    this.mostrarFinalizacionOpem = false;
    this.mostrarMediosPago = false;
    this.loadingPagarTarjeta = false;
    // this.consultarObligaciones();
  }

  onClickInterbanking() {
    console.log(this.detalles);
    this.mostrarModalInterbanking = true;
    $(this.modalInterbanking.nativeElement).modal('show');
  }

  closeModalInterbanking() {
    this.mostrarModalInterbanking = false;
    $(this.modalInterbanking.nativeElement).modal('hide');
  }

  generarInterbanking() {
    const body = {
      secuencia: this.secuencia,
      numero_ope: '',
      fecha_operacion: this.fechaPago,
      numero_cbu: 'IB',
      persona_id: this.personaId,
      fecha_actualizacion: this.fechaPago,
      fecha_alta : this.fechaPago ,
      usuario_ult_mod : '',
      fecha_ult_mod : this.fechaPago,
      medio_pago: 'IB',
      error: ''
    };
    this.generarCabeceraPagoSubscription = this.botonPagoService.generarCabeceraPago(body)
      .subscribe((response) => {
        this.numeroOpe = response.numero_ope;
        this.mostrarCtaCteUnificada = false;
        this.mostrarMediosPago = false;
        this.mostrarFormularioTarjeta = false;
        this.mostrarFinalizacionInterbanking = true;
        this.volverClicked = false;
        this.mensajeExitoso = `Su OPEM se ha registrado exitosamente. <br/> Su número es ${response.numero_ope}.`
      });
    this.loadingPagarTarjeta = false;
  }

  seleccionarCbu() {
    this.botonPagoService.consultaCBUContribuyente(this.personaId)
                         .subscribe( debitoAutomatico => this.debitoAutomatico = debitoAutomatico );
  }

  igualarCbu(selectedValue:string ) {
     this.cbu = selectedValue;
  }

  onClickOpem() {
    this.mostrarModalOpem = true;
    $(this.modalOpem.nativeElement).modal('show');
  }

  closeModalOpem() {
    this.mostrarModalOpem = false;
    $(this.modalOpem.nativeElement).modal('hide');
  }

  generarOpem() {
      const body = {
      secuencia: this.secuencia,
      numero_ope: '',
      fecha_operacion: this.fechaPago,
      numero_cbu: this.cbu,
      persona_id: this.personaId,
      fecha_actualizacion: this.fechaPago,
      fecha_alta : this.fechaPago ,
      usuario_ult_mod : '',
      fecha_ult_mod : this.fechaPago,
      medio_pago: 'comun',
      error: ''
    };
    this.generarCabeceraPagoSubscription = this.botonPagoService.generarCabeceraPago(body)
      .subscribe((response) => {
        this.numeroOpe = response.numero_ope;
        this.mostrarCtaCteUnificada = false;
        this.mostrarMediosPago = false;
        this.mostrarFormularioTarjeta = false;
        this.mostrarFinalizacionInterbanking = false;
        this.mostrarFinalizacionOpem = true;
        this.volverClicked = false;
        this.mensajeExitoso = `Su OPEM se ha registrado exitosamente. <br/> Su número es ${response.numero_ope}.`
      });
    this.loadingPagarTarjeta = false;
  }
}
