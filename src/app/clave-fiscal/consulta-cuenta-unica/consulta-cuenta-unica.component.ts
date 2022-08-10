import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Subject, Subscription } from 'rxjs';
import { AuthenticationService } from '../../authentication/signin/authentication.service';
import { DynamicScriptLoaderService } from '../../dynamic-script-loader-service.service';
import { CuentaUnicaPlanModel } from '../../models/cuenta-unica-plan.model';
import { InscripcionModel } from '../../models/inscripcion.model';
import { ClaveFiscalService } from '../clave-fiscal.service';

declare const $: any;
declare const DataTables: any;

export const TAB_INSCRIPCIONES = 'inscripciones';
export const TAB_PLANES = 'planes';

@Component({
  selector: 'app-consulta-cuenta-unica',
  templateUrl: './consulta-cuenta-unica.component.html'
})
export class ConsultaCuentaUnicaComponent implements OnInit, OnDestroy {

  cuentaUnicaSubscription: Subscription;
  inscripciones: InscripcionModel[] = [];
  planes: CuentaUnicaPlanModel[] = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any>;
  contribuyente;
  formDeuda: FormGroup;
  formBoleta: FormGroup;
  loading = false;
  mostrarListado = false;
  mostrarVolver = false;
  mostrarEstadoDeuda = false;
  mostrarBoletas = false;
  mostrarBoletasPlanes = false;
  mostrarEstadoDeudaPlanes = false;
  activeTab = TAB_INSCRIPCIONES;
  tabInscripciones = TAB_INSCRIPCIONES;
  tabPlanes = TAB_PLANES;

  @BlockUI('visualizar-datos') blockVisualizarDatos: NgBlockUI;

  tipoImponibleSelected;
  claveImponibleSelected;
  impuestoSelected;
  planFacilidadSelected;
  identificacionPlanSelected;

  mostrarDatosInscripcion = false;

  @ViewChild('tablaInscripciones', {static: false}) tablaInscripciones: ElementRef;
  @ViewChild('estadoDeudaModal', {static: true}) estadoDeudaModal: ElementRef;
  @ViewChild('boletaPagoModal', {static: true}) boletaPagoModal: ElementRef;

  yearPickerOptions = {
    minViewMode: 4,
    startView: 4,
    minView: 4,
    format: 'yyyy',
    language: 'es',
    autoclose: true,
    bootcssVer: 4,
    endDate: new Date()
  };

  monthYearPickerOptions = {
    minViewMode: 3,
    startView: 3,
    minView: 3,
    format: 'mm-yyyy',
    language: 'es',
    autoclose: true,
    bootcssVer: 4,
    endDate: new Date()
  };

  constructor(
    private fb: FormBuilder,
    private claveFiscalService: ClaveFiscalService,
    private authService: AuthenticationService,
    private dynamicScriptLoader: DynamicScriptLoaderService) {
    moment.locale('es');
  }

  ngOnInit() {
    this.contribuyente = this.authService.getContribuyenteSesion();
    this.formDeuda = this.fb.group({
      anioDesde: [null, [Validators.required]],
      anioHasta: [null, [Validators.required]],
    }, {updateOn: 'blur'});
    this.formBoleta = this.fb.group({
      mesAnioDesde: [null, [Validators.required]],
      mesAnioHasta: [null, [Validators.required]],
    }, {updateOn: 'blur'});

    this.dtOptions = {
      pageLength: 10,
      pagingType: 'first_last_numbers',
      language: {
        url: '//cdn.datatables.net/plug-ins/1.10.19/i18n/Spanish.json'
      },
      columnDefs: [{
        targets: [1, 2, 3],
        orderable: false
      }]
    };
    this.consultarCuenta();
    setTimeout(() => {
      this.startScript();
    });
  }

  changeTab(tab) {
    this.activeTab = tab;
  }

  consultarCuenta() {
    this.loading = true;
    this.blockVisualizarDatos.start();
    const personaId = this.authService.getSessionUserId();
    this.cuentaUnicaSubscription = this.claveFiscalService.cargarCuentaUnica(personaId)
      .subscribe((data: any) => {
        this.dtTrigger = new Subject();
        this.inscripciones = data.inscripciones;
        this.planes = data.planes;
        this.loading = false;
        this.mostrarListado = true;
        this.mostrarVolver = false;
        setTimeout(() => {
          this.dtTrigger.next();
        });
        this.blockVisualizarDatos.stop();
      }, (err) => {
        console.error(err);
      });
  }

  ngOnDestroy() {
    if (this.cuentaUnicaSubscription) {
      this.cuentaUnicaSubscription.unsubscribe();
    }
    if (this.dtTrigger) {
      this.dtTrigger.unsubscribe();
    }
  }

  startScript() {
    this.dynamicScriptLoader.load('form.min').then(data => {
      // this.cargarCalendars();
    }).catch(error => console.log(error));
  }

  private cargarCalendars() {
    $('#anioDesde').datetimepicker(this.yearPickerOptions, {bootcssVer: 4});
    $('#anioHasta').datetimepicker(this.yearPickerOptions, {bootcssVer: 4});
    $('#mesAnioDesde').datetimepicker(this.monthYearPickerOptions, {bootcssVer: 4});
    $('#mesAnioHasta').datetimepicker(this.monthYearPickerOptions, {bootcssVer: 4});
  }

  closeEstadoDeuda() {
    $(this.estadoDeudaModal.nativeElement).modal('hide');
    this.formDeuda.reset();
  }

  closeBoletaPago() {
    $(this.boletaPagoModal.nativeElement).modal('hide');
    this.formBoleta.reset();
  }

  consultarBoletaPago() {

  }

  consultarDatosInscripcion(inscripcion: InscripcionModel) {
    this.blockVisualizarDatos.start();
    this.tipoImponibleSelected = inscripcion.tipoImponible;
    this.claveImponibleSelected = inscripcion.claveImponible;
    this.mostrarListado = false;
    this.mostrarDatosInscripcion = true;
    this.mostrarEstadoDeuda = false;
    this.mostrarBoletas = false;
    this.mostrarBoletasPlanes = false;
    this.mostrarVolver = true;
    this.mostrarEstadoDeudaPlanes = false;
  }

  consultarDatosPlan(plan: CuentaUnicaPlanModel) {

  }

  consultarEstadoDeuda(inscripcion: InscripcionModel) {
    this.blockVisualizarDatos.start();
    this.tipoImponibleSelected = inscripcion.tipoImponible;
    this.claveImponibleSelected = inscripcion.claveImponible;
    this.impuestoSelected = inscripcion.codigoImp;
    this.mostrarListado = false;
    this.mostrarDatosInscripcion = false;
    this.mostrarEstadoDeuda = true;
    this.mostrarEstadoDeudaPlanes = false;
    this.mostrarBoletas = false;
    this.mostrarBoletasPlanes = false;
    this.mostrarVolver = true;
  }

  consultarEstadoDeudaPlan(plan: CuentaUnicaPlanModel) {
    this.blockVisualizarDatos.start();
    this.planFacilidadSelected = plan.planFacilidad;
    this.mostrarListado = false;
    this.mostrarDatosInscripcion = false;
    this.mostrarEstadoDeuda = false;
    this.mostrarBoletas = false;
    this.mostrarBoletasPlanes = false;
    this.mostrarEstadoDeudaPlanes = true;
    this.mostrarVolver = true;
  }

  consultarBoletas(inscripcion: InscripcionModel) {
    this.blockVisualizarDatos.start();
    this.tipoImponibleSelected = inscripcion.tipoImponible;
    this.claveImponibleSelected = inscripcion.claveImponible;
    this.impuestoSelected = inscripcion.codigoImp;
    this.mostrarListado = false;
    this.mostrarDatosInscripcion = false;
    this.mostrarEstadoDeuda = false;
    this.mostrarBoletas = true;
    this.mostrarBoletasPlanes = false;
    this.mostrarVolver = true;
    this.mostrarEstadoDeudaPlanes = false;
  }

  volverListado() {
    this.blockVisualizarDatos.start();
    this.dtTrigger = new Subject();
    this.mostrarDatosInscripcion = false;
    this.mostrarEstadoDeuda = false;
    this.tipoImponibleSelected = undefined;
    this.claveImponibleSelected = undefined;
    this.impuestoSelected = undefined;
    this.mostrarListado = true;
    this.mostrarVolver = false;
    this.mostrarBoletas = false;
    this.mostrarEstadoDeudaPlanes = false;
    this.mostrarBoletasPlanes = false;
    setTimeout(() => {
      this.dtTrigger.next();
    });
    this.blockVisualizarDatos.stop();
  }

  consultarBoletasPlan(plan: CuentaUnicaPlanModel) {
    this.blockVisualizarDatos.start();
    this.planFacilidadSelected = plan.planFacilidad;
    this.identificacionPlanSelected = plan.identificacion;
    this.mostrarListado = false;
    this.mostrarDatosInscripcion = false;
    this.mostrarEstadoDeuda = false;
    this.mostrarBoletas = false;
    this.mostrarBoletasPlanes = true;
    this.mostrarVolver = true;
    this.mostrarEstadoDeudaPlanes = false;
  }
}
