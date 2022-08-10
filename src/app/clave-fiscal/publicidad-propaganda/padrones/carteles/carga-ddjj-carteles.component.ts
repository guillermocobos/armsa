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

declare const $: any;

@Component({
  selector: 'app-carga-ddjj-carteles',
  templateUrl: './carga-ddjj-carteles.component.html'
})
export class CargaDDJJCartelesComponent implements OnInit, OnDestroy {

  @Input() padron;
  @Output() onVolver = new EventEmitter();

  form: FormGroup;
  submitted = false;
  loading = false;
  loadingBuscar = false;
  loadingCargaDDJJ = false;
  errorGeneral;
  loadingQuitar = false;
  cartelParaQuitar;
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


  zonas = [
    {id: 1, nombre: 'Zona protegida'},
    {id: 1, nombre: 'Zona 1'},
    {id: 1, nombre: 'Zona 2'},
    {id: 1, nombre: 'Peatonales'}
  ];

  caracteristicas = [
    {id: 1, nombre: 'Simple'},
    {id: 2, nombre: 'Iluminado'},
    {id: 3, nombre: 'Luminoso'},
    {id: 4, nombre: 'Animado, Dinámico Proyectado'}
  ];

  arraySiNo = [
    {id: 1, nombre: 'SI'},
    {id: 2, nombre: 'NO'}
  ];

  mostrarMatricula = false;

  listarCartelesSubscription: Subscription;
  cargaDDJJSubscription: Subscription;
  presentarDDJJSubscription: Subscription;

  carteles = [];
  loadingCarteles = false;
  mostrarListaCarteles = true;
  mostrarFormCarteles = false;

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
  ) {
    moment.locale('es');
  }

  ngOnInit() {
    this.form = this.fb.group({
      fechaInstalacion: [null, [Validators.required]],
      domicilioInstalacion: [null, [Validators.required]],
      textoAnuncio: [null, [Validators.required]],
      telefonoAnunciante: [null, [Validators.required]],
      zona: [null, [Validators.required]],
      alto: [0, [Validators.required]],
      ancho: [0, [Validators.required]],
      faz: [0, [Validators.required]],
      vehiculos: [0],
      caracteristica: [null, [Validators.required]],
      cantidadCarteles: [1, [Validators.required]],
      numeroExpediente: [0],
      matriculaAnuncio: [null, [Validators.required]],
      nroMatricula: [0]
    }, {updateOn: 'blur'});
    // this.cargarCalendar();
    this.listarCarteles();
  }

  cantCarteles() {
    return Array(12);
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

  listarCarteles() {
    this.loadingCarteles = true;
    this.blockVisualizarDatos.start();
    const body = {
      padron: this.padron.col01,
      objeto: this.padron.col02
    };
    this.dtTrigger = new Subject();
    this.listarCartelesSubscription = this.publicidadPropagandaService.listarCarteles(body)
      .subscribe((carteles) => {
        console.log(carteles);
        this.carteles = carteles;
        this.loadingCarteles = false;
        setTimeout(() => {
          this.dtTrigger.next();
        }, 100);
        this.blockVisualizarDatos.stop();
      }, (error) => {
        this.loadingCarteles = false;
      })
  }

  agregarCartel() {
    this.mostrarListaCarteles = false;
    this.mostrarFormCarteles = true;
    setTimeout(() => {
      this.cargarCalendars();
    }, 100);
  }

  buscar() {
    this.blockVisualizarDatos.start();
    this.loading = true;
    const body = this.form.value;
    body.personaId = this.authService.getSessionUserId();

    /*this.presentacionesSubscription = this.claveFiscalService.consultaPresentacionesDDJJ(body)
      .subscribe((presentaciones: PresentacionDDJJModel[]) => {
        this.presentaciones = presentaciones;
        this.blockVisualizarDatos.stop();
        this.loading = false;
      });*/
  }

  get f() {
    return this.form.controls;
  }

  onMatriculaAnuncioChange(event) {
    this.mostrarMatricula = event.target.value === '1';
  }


  ngOnDestroy(): void {
    if (this.listarCartelesSubscription) {
      this.listarCartelesSubscription.unsubscribe();
    }
    if (this.cargaDDJJSubscription) {
      this.cargaDDJJSubscription.unsubscribe();
    }
    if (this.presentarDDJJSubscription) {
      this.presentarDDJJSubscription.unsubscribe();
    }
  }

  guardarCartel() {
    this.submitted = true;
    this.loadingCargaDDJJ = true;
    if (this.form.valid) {
      const body = this.form.value;
      body.padron = this.padron.col01;
      body.objeto = this.padron.col02;
      body.claveImponible = this.padron.clave;
      body.tipoImponible = this.padron.tipoImponible;
      body.expedienteAnuncio = '0';
      body.subtotal = 0.0;
      if (this.form.get('matriculaAnuncio').value === 2) {
        body.nroMatricula = '';
        body.numeroExpediente = '';
      }
      this.cargaDDJJSubscription = this.publicidadPropagandaService.agregarCartel(body)
        .subscribe((response) => {
          console.log(response);
          this.submitted = false;
          this.loadingCargaDDJJ = false;
          this.form.reset();
          this.volver();
        }, (error) => {
          this.submitted = false;
          this.errorGeneral = error.message;
        });
    } else {
      this.loadingCargaDDJJ = false;
    }
  }

  volver() {
    this.mostrarFormCarteles = false;
    this.mostrarListaCarteles = true;
    this.listarCarteles();
  }

  openQuitarModal(cartel) {
    this.cartelParaQuitar = cartel;
    $(this.eliminarCartelModalEl.nativeElement).modal('show');
  }

  quitarCartel() {
    this.loadingQuitar = true;
    const body = {
      registroId: this.cartelParaQuitar.idRegistro,
      padron: this.cartelParaQuitar.padron,
      objeto: this.cartelParaQuitar.objeto,
      clave: this.cartelParaQuitar.clave
    };
    this.cargaDDJJSubscription = this.publicidadPropagandaService.quitarCartel(body)
      .subscribe((response) => {
        console.log(response);
        this.loadingQuitar = false;
        this.cartelParaQuitar = undefined;
        this.listarCarteles();
        this.cerrarModalEliminacion();
      }, (error) => {
        this.submitted = false;
        this.errorGeneral = error.message;
      });
  }

  cerrarModalEliminacion() {
    this.cartelParaQuitar = undefined;
    $(this.eliminarCartelModalEl.nativeElement).modal('hide');
  }

  presentarDDJJ() {
    this.loadingPresentar = true;

    const body = this.form.value;
    body.padron = this.padron.col01;
    body.objeto = this.padron.col02;
    body.clave = this.padron.clave;

    this.presentarDDJJSubscription = this.publicidadPropagandaService.presentarDDJJCarteles(body)
      .subscribe((response) => {
        console.log(response);
        this.mostrarListaCarteles = false;
        this.mensajePresentarDDJJ = response.mensaje;
        this.loadingPresentar = false;
      }, (error) => {
        this.errorGeneral = error.message;
        this.loadingPresentar = false;
      });

  }

  volverPadrones() {
    this.onVolver.emit(true);
  }
}
