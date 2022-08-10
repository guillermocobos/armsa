import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import * as FileSaver from 'file-saver';
import {InmobiliarioService} from "../../inmobiliario.service";
import {DynamicScriptLoaderService} from "../../../../dynamic-script-loader-service.service";

declare const $: any;
declare const DataTables: any;

@Component({
  selector: 'app-planes-pago-inmobiliario',
  templateUrl: './planes-pago.component.html'
})
export class PlanesPagoComponent implements OnInit, OnDestroy {

  form: FormGroup;
  formRecalculo: FormGroup;
  loading = false;
  submitted = false;
  loadingRecalcular = false;
  submittedRecalcular = false;
  loadingImprimirBoleta = Array;
  multasSubscription: Subscription;
  planesPagoSubscription: Subscription;
  imprimirSubscription: Subscription;
  datosActaInfraccionSubscription: Subscription;
  planesPago;
  anioActual = +moment().format('YYYY');
  errorDominio;
  errorGeneral;
  multaSelected;
  datosActaInfracciones;
  showModal = false;
  loadingImprimir = false;
  letras;
  numeros;
  loadingEstadoDeuda = false;

  @BlockUI('visualizar-datos') blockVisualizarDatos: NgBlockUI;
  @ViewChild('fechaPago', {static: false}) fechaPagoEl: ElementRef;
  @ViewChild('detalleMulta', {static: true}) detalleMultaEl: ElementRef;

  datepickerOptions = {
    format: 'DD/MM/YYYY',
    weekStart: 1,
    time: false,
    lang: 'es',
    cancelText: 'Cancelar',
    switchOnClick: true
  };

  datosDeConsulta = {
    catastro: '',
    plan: ''
  };

  constructor(
    private inmobiliarioService: InmobiliarioService,
    private fb: FormBuilder,
    private dynamicScriptLoader: DynamicScriptLoaderService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      catastro: [null, Validators.required],
      plan: [null, Validators.required]
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

  private cargarCalendars() {
    $('#fechaPago').bootstrapMaterialDatePicker(this.datepickerOptions).on('change', (e, date) => {
      this.formRecalculo.get('fechaPago').setValue(moment(date).format('DD/MM/YYYY'));
    });
    $('#fechaPago').bootstrapMaterialDatePicker('setMinDate', new Date());
  }


  get f() { return this.form.controls; }
  get fr() { return this.formRecalculo.controls; }

  onSubmit() {
    this.planesPago = false;
    this.datosDeConsulta = {
      catastro: '',
      plan: ''
    };
    this.submitted = true;
    const catastro = this.form.get('catastro').value;
    const plan = this.form.get('plan').value;
    this.loading = true;
    if (this.form.valid) {
      const body = {
        catastro,
        plan
      };
      this.planesPagoSubscription = this.inmobiliarioService.planesPago(body)
        .subscribe( (data) => {
          this.datosDeConsulta = body;
          console.log(data);
          this.errorDominio = undefined;
          this.errorGeneral = undefined;
          this.planesPago = data;
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
          this.planesPago = undefined;
          this.loading = false;
        });
    } else {
      this.loading = false;
    }
  }

  calcularDeuda() {
    this.submittedRecalcular = true;
    if (this.formRecalculo.valid) {
      this.loadingRecalcular = true;
      this.blockVisualizarDatos.start();
      const body = {
        catastro: this.datosDeConsulta.catastro,
        plan: this.datosDeConsulta.plan,
        fechaPago: this.formRecalculo.get('fechaPago').value,
        claveImponible: this.planesPago.login.clave
      };
      this.planesPagoSubscription = this.inmobiliarioService.planesPagoFechaPago(body)
        .subscribe((data) => {
          console.log(data);
          this.planesPago.estadoPlanInmobiliario = data;
          this.submittedRecalcular = false;
          this.loadingRecalcular = false;
          this.blockVisualizarDatos.stop();
        }, error => {
          this.loadingRecalcular = false;
          this.submittedRecalcular = false;
          this.planesPago = undefined;
          this.blockVisualizarDatos.stop();
        });
    }
  }

  imprimirEstadoDeuda() {
    const body = {
        catastro: this.datosDeConsulta.catastro,
        titular: this.planesPago.datosContribuyente.razonSocial,
        p_domicilio: this.planesPago.domicilioImponible.domicilio,
        textoImpuesto: 'Impuesto Inmobiliario',
        tipoImponible: '0007',
        impuesto: '0007',
        claveImponible: this.planesPago.login.clave,
        concepto: '0006'
    };
    this.loadingEstadoDeuda = true;
    this.imprimirSubscription = this.inmobiliarioService.imprimirEstadoDeudaPlan(body)
      .subscribe((response: any) => {
        const blob = new Blob([response], {
          type: 'application/pdf'
        });
        FileSaver.saveAs(blob, `estado_deuda_plan_${this.datosDeConsulta.catastro}_${this.datosDeConsulta.plan}.pdf`);
        this.loadingEstadoDeuda = false;
      }, () => {
        this.loadingEstadoDeuda = false;
      });
  }

  ngOnDestroy(): void {
    if (this.multasSubscription) {
      this.multasSubscription.unsubscribe();
    }
    if (this.planesPagoSubscription) {
      this.planesPagoSubscription.unsubscribe();
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

  imprimirBoleta(deuda: any, indice: number) {
    this.loadingImprimirBoleta[indice] = true;
    const body = {
      personaId: this.planesPago.login.personaId,
      anio: deuda.anio,
      periodo: deuda.numeroCuota + '-' + deuda.anio,
      fechaVencimiento: deuda.fechaPrimerVencimiento,
      // plan: this.datosDeConsulta.plan,
      catastro: this.datosDeConsulta.catastro,
      titular: this.planesPago.datosContribuyente.nombreCompleto,
      domicilio: this.planesPago.domicilioImponible.domicilio,
      dni: this.planesPago.datosContribuyente.nroDocumento,
      marca: this.planesPago.login.marca,
      tipo: this.planesPago.login.tipo,
      valorEd: this.planesPago.login.anioDom,
      grupo: this.planesPago.login.grupo,
      importeVto: deuda.subtotal,
      modelo: this.planesPago.login.modelo,
      version: this.planesPago.login.modelo,
      codigoBarra: deuda.codigoDeBarras,
      categoria: this.planesPago.login.categoria,
      clave: this.planesPago.login.clave
    };
    this.imprimirSubscription = this.inmobiliarioService.imprimirBoletaInmobiliario(body)
      .subscribe((response: any) => {
        this.loading = false;
        const blob = new Blob([response], {
          type: 'application/pdf'
        });
        FileSaver.saveAs(blob, `F920_impuesto_inmobiliario_${this.datosDeConsulta.catastro + '_' + deuda.numeroCuota + '_' + deuda.anio}.pdf`);
        this.loadingImprimirBoleta[indice] = false;
      });
  }




}
