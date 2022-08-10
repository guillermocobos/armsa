import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { AutomotoresService } from '../../automotores.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import * as FileSaver from 'file-saver';
import {PagoTarjetaService} from '../../../../clave-fiscal/boton-pago/pago-tarjeta/pago-tarjeta.service';

declare const $: any;
declare const DataTables: any;

@Component({
  selector: 'app-multas-transito',
  templateUrl: './multas-transito.component.html'
})
export class MultasTransitoComponent implements OnInit, OnDestroy {

  form: FormGroup;
  formRecalculo: FormGroup;
  loading = false;
  submitted = false;
  loadingRecalcular = false;
  submittedRecalcular = false;
  loadingImprimirBoleta = Array;
  multasSubscription: Subscription;
  loginAutoSubscription: Subscription;
  generarDetallesVtosSubscription: Subscription;
  imprimirSubscription: Subscription;
  datosActaInfraccionSubscription: Subscription;
  multas;
  anioActual = +moment().format('YYYY');
  errorDominio;
  errorGeneral;
  multaSelected;
  datosActaInfracciones;
  mostrarListadoDeuda = true;
  mostrarFormularioTarjeta = false;
  mostrarFinalizacion = false;
  showModal = false;
  secuencia;
  personaId;
  claveImponible;
  importeTotal;
  cabeceraId;
  mostra;
  mensajeExitoso;
  loadingPagarTarjeta;
  loadingImprimir = false;

  @BlockUI('visualizar-datos') blockVisualizarDatos: NgBlockUI;
  @ViewChild('fechaPago', {static: false}) fechaPagoEl: ElementRef;
  @ViewChild('detalleMulta', {static: false}) detalleMultaEl: ElementRef;

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
    private pagoTarjetaService: PagoTarjetaService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      dominio: [null, Validators.required],
      acta: [null]
    }, {updateOn: 'blur'});
    this.formRecalculo = this.fb.group({
      fechaPago: [null, Validators.required]
    }, {updateOn: 'blur'});
  }

  get f() { return this.form.controls; }
  get fr() { return this.formRecalculo.controls; }

  onSubmit() {
    this.multas = false;
    this.datosDeConsulta = {
      dominio: ''
    };
    const dominio = this.form.get('dominio').value;
    const acta = this.form.get('acta').value;
    this.submitted = true;
    if (this.form.valid && (dominio || acta)) {
      this.loading = true;
      const body = {
        dominio,
        acta
      };
      this.loginAutoSubscription = this.automotoresService.loginMultasAuto(body)
        .subscribe((data) => {
          this.datosDeConsulta = {
            dominio
          };
          console.log(data);
          this.errorDominio = undefined;
          this.errorGeneral = undefined;
          this.multas = data;
          this.submitted = false;
          this.loading = false;
        }, error => {
          if (error.status === 400) {
            console.log(error);
            this.errorDominio = error.error.message;
          }
          if (error.status === 500) {
            this.errorGeneral = error.message;
          }
          this.multas = undefined;
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
        claveImponible: this.multas.login.clave
      };
      this.multasSubscription = this.automotoresService.loginMultasAuto(body)
        .subscribe((data) => {
          console.log(data);
          this.multas.deudaAutos = data;
          this.submittedRecalcular = false;
          this.loadingRecalcular = false;
          this.blockVisualizarDatos.stop();
        }, error => {
          this.loadingRecalcular = false;
          this.submittedRecalcular = false;
          this.multas = undefined;
          this.blockVisualizarDatos.stop();
        });
    }
  }

  ngOnDestroy(): void {
    if (this.multasSubscription) {
      this.multasSubscription.unsubscribe();
    }
    if (this.loginAutoSubscription) {
      this.loginAutoSubscription.unsubscribe();
    }
    if (this.imprimirSubscription) {
      this.imprimirSubscription.unsubscribe();
    }
    if (this.datosActaInfraccionSubscription) {
      this.datosActaInfraccionSubscription.unsubscribe();
    }
  }

  closeModal() {
    $(this.detalleMultaEl.nativeElement).modal('hide');
    this.datosActaInfracciones = undefined;
  }

  datosActaInfraccion(acta) {
    if (this.datosActaInfraccionSubscription) {
      this.datosActaInfraccionSubscription.unsubscribe();
    }
    this.datosActaInfraccionSubscription = this.automotoresService.datosActaInfracciones(acta)
      .subscribe((data) => {
        console.log(data);
        this.datosActaInfracciones = data;
        $(this.detalleMultaEl.nativeElement).modal('show');
      }, error => {
        this.datosActaInfracciones = undefined;
        $(this.detalleMultaEl.nativeElement).modal('hide');
      });
  }

  pagarBoleta(deuda: any, indice: number){
    console.log(deuda);
    console.log("noi:"+deuda.numeroObligacionImpuesto);
    console.log("cuota:"+deuda.numeroCuota);
    console.log("fechaVto:"+deuda.fechaprimervencimiento);
    console.log("claveImpoble:"+deuda.claveImponible);
    console.log("contribuyente:"+deuda.contribuyente);
    console.log(indice);
    this.personaId = deuda.contribuyente;
    this.claveImponible = deuda.claveImponible;
    this.importeTotal = deuda.saldo;

    this.secuencia = undefined;

    const detalles = [{
      impuesto: '0006',
      conceptoObligacion: '0021',
      noi: deuda.numeroObligacionImpuesto,
      numRectif: '0',
      numCuota: deuda.numeroCuota,
      tipoImponible: '0006',
      claveImponible: deuda.claveImponible,
      fechaPrimerVencimiento: deuda.fechaprimervencimiento,
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
          console.log("secuencia:"+response.secuencia);
        }
      });

  }

  onPagoExitoso(result) {
    console.log('RESULT onPagoExitoso', result);
    console.log('secuencia', this.secuencia);
    // REGISTRO CAB Y DETALLES DEL PAGO
    const body = {
      personaId: this.personaId,
      fechaPago: moment().format('DD/MM/YYYY'),//this.formRecalculo.get('fechaPago').value,
      secuencia: this.secuencia,
      tipoImponible: '0006',
      claveImponible: this.claveImponible,
      impuesto: '0006',
      concepto: '0021',
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
    this.onSubmit();
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

  imprimirBoleta(deuda: any, indice: number) {
    this.loadingImprimirBoleta[indice] = true;
    console.log(deuda);
    const body = {
      personaId: this.multas.login.personaId,
      anio: deuda.anio,
      periodo: deuda.acta,
      fechaVencimiento: deuda.fechaPrimerVencimiento,
      dominio: this.datosDeConsulta.dominio,
      titular: this.multas.datosContribuyente.nombreCompleto,
      domicilio: this.multas.domicilioImponible.domicilio,
      dni: this.multas.datosContribuyente.nroDocumento || '',
      cuit: this.multas.datosContribuyente.cuit,
      marca: this.multas.login.marca,
      tipo: this.multas.login.tipo,
      valorEd: this.multas.login.anioDom,
      grupo: this.multas.login.grupo,
      resultadoResta: deuda.subtotal,
      modelo: this.multas.login.modelo,
      version: this.multas.login.modelo,
      codigoBarra: deuda.codigoDeBarras,
      categoria: this.multas.login.categoria,
      clave: this.multas.login.clave,
      acta: deuda.acta,
      fechaInfraccion: deuda.fechaInfraccion,
      importeVto: deuda.saldo - deuda.gasto,
      codInfracc: deuda.observaciones,
      gastosAdm: deuda.gasto,
      montoBase: deuda.saldo
    };
    this.imprimirSubscription = this.automotoresService.imprimirBoletaMultasTransito(body)
      .subscribe((response: any) => {
        this.loadingImprimirBoleta[indice] = false;
        const blob = new Blob([response], {
          type: 'application/pdf'
        });
        FileSaver.saveAs(blob, `F219_multas_transito_${body.dominio + '_' + deuda.acta}.pdf`);
      });
  }
}
