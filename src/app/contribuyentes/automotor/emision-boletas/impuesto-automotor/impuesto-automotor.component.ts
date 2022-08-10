import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { OpemTributoConceptoModel } from '../../../../models/opem-tributo-concepto.model';
import { Subject, Subscription } from 'rxjs';
import { AutomotoresService } from '../../automotores.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { DynamicScriptLoaderService } from '../../../../dynamic-script-loader-service.service';
import * as FileSaver from 'file-saver';
import {PagoTarjetaService} from '../../../../clave-fiscal/boton-pago/pago-tarjeta/pago-tarjeta.service';

declare const $: any;
declare const DataTables: any;

@Component({
  selector: 'app-impuesto-automotor',
  templateUrl: './impuesto-automotor.component.html'
})
export class ImpuestoAutomotorComponent implements OnInit, OnDestroy {

  form: FormGroup;
  formRecalculo: FormGroup;
  loading = false;
  submitted = false;
  loadingRecalcular = false;
  submittedRecalcular = false;
  loadingImprimirBoleta = Array;
  estadoDeudaSubscription: Subscription;
  generarDetallesVtosSubscription: Subscription;
  loginAutoSubscription: Subscription;
  imprimirSubscription: Subscription;
  estadoDeuda;
  personaId;
  importeTotal;
  importeOriginal = "0.00";
  mostrarListadoDeuda = true;
  mostrarFormularioTarjeta = false;
  mostrarFinalizacion = false;
  secuencia;
  anioActual = +moment().format('YYYY');
  errorDominio;
  errorGeneral;
  deudaOriginal;

  cabeceraId;
  mostra;
  mensajeExitoso;
  loadingPagarTarjeta = false;
  loadingImprimir = false;


  @BlockUI('visualizar-datos') blockVisualizarDatos: NgBlockUI;
  @ViewChild('fechaPago', {static: false}) fechaPagoEl: ElementRef;

  datepickerOptions = {
    format: 'DD/MM/YYYY',
    weekStart: 1,
    time: false,
    lang: 'es',
    cancelText: 'Cancelar',
    switchOnClick: true
  };

  datosDeConsulta = {
    dominio: ''
  };

  constructor(
    private automotoresService: AutomotoresService,
    private fb: FormBuilder,
    private dynamicScriptLoader: DynamicScriptLoaderService,
    private pagoTarjetaService: PagoTarjetaService
  ) {}

  ngOnInit() {

    this.form = this.fb.group({
      dominio: [null, Validators.required]
    }, {updateOn: 'blur'});
    this.formRecalculo = this.fb.group({
      fechaPago: [null, Validators.required]
    }, {updateOn: 'blur'});
  }

  startScript() {
    this.dynamicScriptLoader.load('form.min').then(data => {
      this.cargarCalendars();
    }).catch(error => console.log(error));
  }

  cargarCalendars() {
    $('#fechaPago').bootstrapMaterialDatePicker(this.datepickerOptions).on('change', (e, date) => {
      this.formRecalculo.get('fechaPago').setValue(moment(date).format('DD/MM/YYYY'));
    });
    $('#fechaPago').bootstrapMaterialDatePicker('setMinDate', new Date());
  }

  get f() { return this.form.controls; }
  get fr() { return this.formRecalculo.controls; }

  onSubmit() {
    this.estadoDeuda = false;
    this.datosDeConsulta = {
      dominio: ''
    };
    this.submitted = true;
    if (this.form.valid) {
      this.loading = true;
      const dominio = this.form.get('dominio').value;
      const body = {
        dominio
      };
      this.loginAutoSubscription = this.automotoresService.loginAuto(body)
        .subscribe( (data) => {
          this.datosDeConsulta = body;
          console.log(data);
          this.errorDominio = undefined;
          this.errorGeneral = undefined;
          this.deudaOriginal = data.deudaAutos;
          this.estadoDeuda = data;
          this.personaId = data.login.personaId;
          this.submitted = false;
          this.loading = false;
          setTimeout(() => {
            this.startScript();
          });
        }, error => {
          if (error.status === 400) {
            console.log(error);
            this.errorDominio = error.error.message;
          }
          if (error.status === 500) {
            this.errorGeneral = error.message;
          }
          this.estadoDeuda = undefined;
          this.loading = false;
        });
    }
  }

  calcularDeuda() {
    this.submittedRecalcular = true;
    if (this.formRecalculo.valid) {
      this.loadingRecalcular = true;
      this.blockVisualizarDatos.start();
      const body = {
        fechaPago: this.formRecalculo.get('fechaPago').value,
        claveImponible: this.estadoDeuda.login.clave
      };
      this.estadoDeudaSubscription = this.automotoresService.estadoDeuda(body)
        .subscribe((data) => {
          console.log(data);
          this.estadoDeuda.deudaAutos = data;
          this.submittedRecalcular = false;
          this.loadingRecalcular = false;
          this.blockVisualizarDatos.stop();
        }, error => {
          this.loadingRecalcular = false;
          this.submittedRecalcular = false;
          this.estadoDeuda = undefined;
          this.blockVisualizarDatos.stop();
        });
    }
  }

  ngOnDestroy(): void {
    if (this.estadoDeudaSubscription) {
      this.estadoDeudaSubscription.unsubscribe();
    }
    if (this.loginAutoSubscription) {
      this.loginAutoSubscription.unsubscribe();
    }
    if (this.imprimirSubscription) {
      this.imprimirSubscription.unsubscribe();
    }
  }

  imprimirBoleta(deuda: any, indice: number) {
    this.loadingImprimirBoleta[indice] = true;
    const body = {
      personaId: this.estadoDeuda.login.personaId,
      anio: deuda.anio,
      periodo: deuda.numeroCuota + '-' + deuda.anio,
      fechaVencimiento: deuda.fechaPrimerVencimiento,
      dominio: this.datosDeConsulta.dominio,
      titular: this.estadoDeuda.datosContribuyente.nombreCompleto,
      domicilio: this.estadoDeuda.domicilioImponible.domicilio,
      dni: this.estadoDeuda.datosContribuyente.nroDocumento,
      marca: this.estadoDeuda.login.marca,
      tipo: this.estadoDeuda.login.tipo,
      valorEd: this.estadoDeuda.login.anioDom,
      grupo: this.estadoDeuda.login.grupo,
      importeVto: deuda.subtotal,
      modelo: this.estadoDeuda.login.modelo,
      version: this.estadoDeuda.login.modelo,
      codigoBarra: deuda.codigoDeBarras,
      categoria: this.estadoDeuda.login.categoria,
      clave: this.estadoDeuda.login.clave
    };
    this.imprimirSubscription = this.automotoresService.imprimirBoletaAutomotor(body)
      .subscribe((response: any) => {
        this.loadingImprimirBoleta[indice] = false;
        const blob = new Blob([response], {
          type: 'application/pdf'
        });
        FileSaver.saveAs(blob,`F932_impuesto_automotor_${body.dominio + '_' + deuda.numeroCuota + '_' + deuda.anio.toString().trim()}.pdf`);
      });
  }
  generarDetallesVencimientos(deuda) {

    const cuotaOriginal = this.deudaOriginal.find((cuota) => {
      return deuda.anio == cuota.anio && deuda.numeroCuota == cuota.numeroCuota;
    });

    this.importeTotal = cuotaOriginal.subtotal;
    //this.importeOriginal = cuotaOriginal.subtotal;

    this.secuencia = undefined;

    const detalles = [{
      impuesto: '0006',
      conceptoObligacion: '0006',
      noi: deuda.numeroObligacionImpuesto,
      numRectif: '0',
      numCuota: deuda.numeroCuota,
      tipoImponible: '0006',
      claveImponible: this.estadoDeuda.login.clave,
      fechaPrimerVencimiento: deuda.fechaPrimerVencimiento,
      importeOriginal: deuda.impuesto,
      importeActualizado: deuda.saldo

    }];


    const body = {
      fechaPago: moment().format('DD/MM/YYYY'),//this.formRecalculo.get('fechaPago').value,
      detalles: detalles,
      personaId: this.personaId
    };
    this.generarDetallesVtosSubscription = this.pagoTarjetaService.generarDetallesVtos(body)
      .subscribe((response) => {
        console.log(response);
        if (response.error) {
          this.errorGeneral = 'Hubo un error al procesar la deuda.'
        } else {
          // MUESTRO EL FORMULARIO PARA PAGAR CON TARJETA
          this.mostrarListadoDeuda = false;
          this.mostrarFormularioTarjeta = true;
          this.mostrarFinalizacion = false;
          this.secuencia = response.secuencia;
        }
      });

  }

  onPagoExitoso(result) {
    console.log('RESULT onPagoExitoso', JSON.stringify(result));
    console.log('secuencia', this.secuencia);
    console.log("this.importeOriginal:"+this.importeOriginal);
    console.log("this.importeTotal:"+this.importeTotal);

    // REGISTRO CAB Y DETALLES DEL PAGO
    const body = {
      personaId: this.personaId,
      fechaPago: moment().format('DD/MM/YYYY'),//this.formRecalculo.get('fechaPago').value,
      secuencia: this.secuencia,
      tipoImponible: '0006',
      claveImponible: this.estadoDeuda.login.clave,
      impuesto: '0006',
      concepto: '0006',
      amountOrig: this.importeTotal,
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
        this.mostra = false;
        this.mostrarFormularioTarjeta = false;
        this.mostrarFinalizacion = true;
        this.mensajeExitoso = 'Su pago se ha registrado exitosamente. <br/>En los próximos minutos recibirá un correo electrónico con la Confirmación de Pago.'
      });
    this.loadingPagarTarjeta = false;
  }

  finalizar() {
    this.mostrarListadoDeuda = true;
    this.mostrarFormularioTarjeta = false;
    this.mostrarFinalizacion = false;
    this.calcularDeuda();
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
}
