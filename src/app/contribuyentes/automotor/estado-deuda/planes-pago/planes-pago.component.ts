import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { AutomotoresService } from '../../automotores.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { DynamicScriptLoaderService } from '../../../../dynamic-script-loader-service.service';
import * as FileSaver from 'file-saver';

declare const $: any;
declare const DataTables: any;

@Component({
  selector: 'app-planes-pago-estado-deuda',
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

  datepickerOptions = {
    format: 'DD/MM/YYYY',
    weekStart: 1,
    time: false,
    lang: 'es',
    cancelText: 'Cancelar',
    switchOnClick: true
  };

  datosDeConsulta = {
    dominio: '',
    plan: '',
    clave: ''
  };

  constructor(
    private automotoresService: AutomotoresService,
    private fb: FormBuilder,
    private dynamicScriptLoader: DynamicScriptLoaderService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      dominio: [null, Validators.required],
      clave: [null, Validators.required],
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

  cargarCalendars() {
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
      dominio: '',
      plan: '',
      clave: ''
    };
    this.submitted = true;
    this.loading = true;
    const dominio = this.form.get('dominio').value;
    const plan = this.form.get('plan').value;
    const clave = this.form.get('clave').value;
    if (this.form.valid) {
      const body = {
        dominio,
        plan,
        clave
      };
      this.planesPagoSubscription = this.automotoresService.planesPago(body)
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
        dominio: this.datosDeConsulta.dominio,
        plan: this.datosDeConsulta.plan,
        fechaPago: this.formRecalculo.get('fechaPago').value,
        claveImponible: this.planesPago.login.clave
      };
      this.planesPagoSubscription = this.automotoresService.planesPago(body)
        .subscribe((data) => {
          console.log(data);
          this.planesPago.estadoPlanAutos = data.estadoPlanAutos;
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
      plan: this.datosDeConsulta.plan
    };
    this.loadingEstadoDeuda = true;
    this.imprimirSubscription = this.automotoresService.imprimirEstadoDeudaPlan(body)
      .subscribe((response: any) => {
        const blob = new Blob([response], {
          type: 'application/pdf'
        });
        FileSaver.saveAs(blob, `estado_deuda_plan_${this.datosDeConsulta.dominio}_${this.datosDeConsulta.plan}.pdf`);
        this.loadingEstadoDeuda = false;
      }, () => {
        this.loadingEstadoDeuda = false;
      });
  }

  imprimirBoleta(deuda: any, indice: number) {
    this.loadingImprimirBoleta[indice] = true;
    const body = {
      impuestoDesc: deuda.impuestoDesc + ' - ' + deuda.conceptoObligacionDesc,
      plan: this.datosDeConsulta.plan,
      razonSocial: this.planesPago.datosContribuyente.razonSocial,
      expediente: deuda.expediente,
      cuit: this.planesPago.datosContribuyente.cuit,
      numeroCuota: deuda.numeroCuota,
      fechaPrimerVencimiento: deuda.fechaPrimerVencimiento,
      impuestoOrig: deuda.impuestoOrig,
      accesorios: deuda.accesorios, // se suma accesorios 2?
      subtotal: deuda.subtotal,
      importeLetras: deuda.importeLetras,
      codigoDeBarras: deuda.codigoDeBarras
    };
    this.imprimirSubscription = this.automotoresService.imprimirBoletaPlanPago(body)
      .subscribe((response: any) => {
        this.loading = false;
        const blob = new Blob([response], {
          type: 'application/pdf'
        });
        FileSaver.saveAs(blob, `F981_plan_de_pago_automotor_${this.datosDeConsulta.dominio + '_' + deuda.numeroCuota}.pdf`);
        this.loadingImprimirBoleta[indice] = false;
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

}
