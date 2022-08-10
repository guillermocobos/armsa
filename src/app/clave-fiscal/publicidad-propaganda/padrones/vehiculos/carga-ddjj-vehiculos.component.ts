import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import {Subject, Subscription} from 'rxjs';
import { ClaveFiscalService } from '../../../clave-fiscal.service';
import { AuthenticationService } from '../../../../authentication/signin/authentication.service';
import { PadronPyPModel } from '../../../../models/padron-pyp.model';
import * as moment from 'moment';
import {PublicidadPropagandaService} from "../../publicidad-propaganda.service";
import {DynamicScriptLoaderService} from "../../../../dynamic-script-loader-service.service";
import {Router} from "@angular/router";

declare const $: any;

@Component({
  selector: 'app-carga-ddjj-vehiculos',
  templateUrl: './carga-ddjj-vehiculos.component.html'
})
export class CargaDDJJVehiculosComponent implements OnInit, OnDestroy {

  @Input() padron;
  @Output() onVolver = new EventEmitter();

  form: FormGroup;
  loading = false;
  errorGeneral;
  submittedPresentar = false;
  loadingPresentar = false;
  mensajePresentarDDJJ;

  @ViewChild('fechaInstalacion', {static: true}) fechaInstalacionEl: ElementRef;
  @ViewChild('eliminarCartelModal', {static: true}) eliminarCartelModalEl: ElementRef;

  datepickerOptions = {
    format: 'DD/MM/YYYY',
    weekStart: 1,
    time: false,
    lang: 'es',
    cancelText: 'Cancelar',
    switchOnClick: true,
    disabledDays: [6,7],
    monthPicker: false
  };

  presentarDDJJSubscription: Subscription;

  mostrarFormVehiculos = true;

  dtOptions: DataTables.Settings = {
    pageLength: 10,
    pagingType: 'first_last_numbers',
    language: {
      url: '//cdn.datatables.net/plug-ins/1.10.19/i18n/Spanish.json'
    },
    columnDefs: [
      { orderable: false, targets: [9] }
    ]
  };
  dtTrigger: Subject<any>;

  @BlockUI('visualizar-datos') blockVisualizarDatos: NgBlockUI;

  constructor(
    private fb: FormBuilder,
    private claveFiscalService: ClaveFiscalService,
    private authService: AuthenticationService,
    private cdr: ChangeDetectorRef,
    private publicidadPropagandaService: PublicidadPropagandaService,
    private dynamicScriptLoader: DynamicScriptLoaderService,
    private router: Router
  ) {
    moment.locale('es');
  }

  ngOnInit() {
    this.form = this.fb.group({
      fechaInstalacion: [null, [Validators.required]],
      domicilioInstalacion: [null, [Validators.required]],
      telefonoAnunciante: [null, [Validators.required]],
      dominio: [null, [Validators.required]],
      vehiculos: [0]
    }, {updateOn: 'blur'});
    setTimeout(() => {
      this.startScript();
    });
  }

  startScript() {
    this.dynamicScriptLoader.load('form.min').then(data => {
      this.cargarCalendars();
    }).catch(error => console.log(error));
  }

  private cargarCalendars() {
    $('#fechaInstalacion').bootstrapMaterialDatePicker(this.datepickerOptions).on('change', (e, date) => {
      this.form.get('fechaInstalacion').setValue(moment(date).format('DD/MM/YYYY'));
    });
    $('#fechaInstalacion').bootstrapMaterialDatePicker('setMinDate', new Date());
  }

  get f() {
    return this.form.controls;
  }

  ngOnDestroy(): void {
    if (this.presentarDDJJSubscription) {
      this.presentarDDJJSubscription.unsubscribe();
    }
  }

  volver() {
    this.router.navigate(['/clave-fiscal/publicidad-propaganda/padrones']);
  }

  presentarDDJJ() {
    this.loadingPresentar = true;
    this.submittedPresentar = true;

    if (this.form.valid) {
      const body = this.form.value;
      body.padron = this.padron.col01;
      body.objeto = this.padron.col02;
      body.clave = this.padron.clave;


      this.presentarDDJJSubscription = this.publicidadPropagandaService.presentarDDJJVehiculo(body)
        .subscribe((response) => {
          console.log(response);
          this.mostrarFormVehiculos = false;
          this.mensajePresentarDDJJ = response.mensaje || response.error;
          this.loadingPresentar = false;
        }, (error) => {
          this.errorGeneral = error.message;
          this.loadingPresentar = false;
        });
    } else {
      this.loadingPresentar = false;
    }
  }

  volverPadrones() {
    this.onVolver.emit(true);
  }
}
