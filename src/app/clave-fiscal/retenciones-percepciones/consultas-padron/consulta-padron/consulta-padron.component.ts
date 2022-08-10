import { Component, OnDestroy, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Subject, Subscription } from 'rxjs';
import { ClaveFiscalService } from '../../../../clave-fiscal/clave-fiscal.service';
import { RetencionesPercepcionesService } from '../../retenciones-percepciones.service';
import { AuthenticationService } from '../../../../authentication/signin/authentication.service';
import * as moment from 'moment';
import { DynamicScriptLoaderService } from '../../../../dynamic-script-loader-service.service';

declare const $: any;

@Component({
  selector: 'app-consulta-padron',
  templateUrl: './consulta-padron.component.html'
})

export class ConsultaPadronComponent implements OnInit, OnDestroy {
  form: FormGroup;
  submitted = false;
  loading = false;
  @BlockUI('visualizar-datos') blockVisualizarDatos: NgBlockUI;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any>;

  mostrarModalDetalle = false;
  mostrarFinalizacionDetalle = false;
  @ViewChild('modalDetalle', {static: false}) modalDetalle1: ElementRef;

  padrones = [];
  transacciones = [];
  transaccionesDetalle = [];
  padronesSubscription: Subscription;
  percepciones = [];
  percepcionesSubscription: Subscription;

  datepickerOptions = {
    format: 'MM/YYYY',
    weekStart: 1,
    time: false,
    lang: 'es',
    cancelText: 'Cancelar',
    switchOnClick: true
  };

  constructor(
    private retencionesPercepciones: RetencionesPercepcionesService,
    private fb: FormBuilder,
    private claveFiscalService: ClaveFiscalService,
    private authService: AuthenticationService,
    private dynamicScriptLoader: DynamicScriptLoaderService
  ) {
    moment.locale('es');
  }

  ngOnInit() {
    this.form = this.fb.group({
       periodoDesde: [moment().format('MM/YYYY'), Validators.required] ,
       periodoHasta: [moment().format('MM/YYYY'), Validators.required]
    }, {updateOn: 'blur'});
    this.dtOptions = {
      pageLength: 10,
      pagingType: 'first_last_numbers',
      language: {
        url: '//cdn.datatables.net/plug-ins/1.10.19/i18n/Spanish.json'
      },
      columnDefs: [{
        targets: [1, 2, 3, 4],
        orderable: false
      }]
    };
    this.startScript();
    this.getPadrones();
  }

  buscar(){

  }

  ngOnDestroy(): void {
    if (this.padronesSubscription ) {
      this.padronesSubscription.unsubscribe();
    }
  }


  startScript() {
    this.dynamicScriptLoader.load('form.min').then(data => {
      this.cargarCalendars();
    }).catch(error => console.log(error));
  }


  private cargarCalendars() {
    $('#periodoDesde').bootstrapMaterialDatePicker(this.datepickerOptions).on('change', (e, date) => {
      this.form.get('periodoDesde').setValue(moment(date).format('MM/YYYY'));
    });
    $('#periodoDesde').bootstrapMaterialDatePicker('setMaxDate', new Date());

    $('#periodoHasta').bootstrapMaterialDatePicker(this.datepickerOptions).on('change', (e, date) => {
      this.form.get('periodoHasta').setValue(moment(date).format('MM/YYYY'));
    });
    $('#periodoHasta').bootstrapMaterialDatePicker('setMaxDate', new Date());
  }

  private getPadrones(){
    const body = {
      persona_id: this.authService.getSessionUserId()
    };
    this.padronesSubscription = this.retencionesPercepciones.obtenerPadronesPersona(body)
        .subscribe( padrones => {
            this.padrones = padrones;
        })
  }

  obtenerPercepciones(){
    this.blockVisualizarDatos.start();
    this.loading = true;
    const body = {
      periodoDesde: this.form.get('periodoDesde').value,
      periodoHasta: this.form.get('periodoHasta').value,
      cuit: '20239531904'
    };
    this.percepcionesSubscription = this.retencionesPercepciones.obtenerPercepciones(body)
        .subscribe( percepciones => {
            this.dtTrigger = new Subject();
            this.percepciones = percepciones;
            this.blockVisualizarDatos.stop();
            this.loading = false;
        })
  }

  get f() {
    return this.form.controls;
  }

}
