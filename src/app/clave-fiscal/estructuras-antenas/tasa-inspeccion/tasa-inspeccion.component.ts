import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AuthenticationService } from '../../../authentication/signin/authentication.service';
import { ClaveFiscalService } from '../../clave-fiscal.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import {EstructurasAntenasService} from "../estructuras-antenas.service";
import * as moment from "moment";
import * as FileSaver from "file-saver";
import cuitValidator from "../../../shared/helpers/validators/cuit-validator";

declare const $: any;

@Component({
  selector: 'app-tasa-inspeccion',
  templateUrl: './tasa-inspeccion.component.html'
})
export class TasaInspeccionComponent implements OnInit, OnDestroy {
  contribuyente;
  personaId;
  loading = false;
  formEliminar: FormGroup;
  formAgregarEstructura: FormGroup;

  dtOptions: DataTables.Settings = {
    pageLength: 10,
    pagingType: 'first_last_numbers',
    language: {
      url: '//cdn.datatables.net/plug-ins/1.10.19/i18n/Spanish.json'
    },
    order: [[ 0, 'asc']]
  };
  dtTrigger: Subject<any>;
  datosInspeccion = [];
  totalTasa;
  datosInspeccionSubscription: Subscription;
  insertarInstalacionSubscription: Subscription;
  datosTasaPeriodo = [];
  thisYear = moment().format('YYYY');
  mensajeConfirmacion;
  loadingInsertar = false;

  @BlockUI('visualizar-datos') blockVisualizarDatos: NgBlockUI;
  @ViewChild('confirmacionModal', {static: true}) confirmacionModal: ElementRef;


  constructor(
    private authService: AuthenticationService,
    private claveFiscalService: ClaveFiscalService,
    private fb: FormBuilder,
    private estructurasAntenasService: EstructurasAntenasService
  ) {}

  ngOnInit() {
    this.personaId = this.authService.getSessionUserId();
    this.contribuyente = this.authService.getContribuyenteSesion();
    this.consultarDatosInspeccion();
    this.formEliminar = this.fb.group({
      motivoEliminacion: [null, Validators.required]
    }, {updateOn: 'blur'});

  }

  get fe() {
    return this.formEliminar.controls;
  }
  get fa() {
    return this.formAgregarEstructura.controls;
  }

  consultarDatosInspeccion() {
    this.loading = true;
    this.blockVisualizarDatos.start();
    this.datosInspeccion = [];

    this.dtTrigger = new Subject();
    this.datosInspeccionSubscription = this.estructurasAntenasService.obtenerDatosInspeccion()
      .subscribe((data: any) => {
        console.log(data);
        if (data.datosInspeccion.length > 0) {
          this.totalTasa = data.datosInspeccion.splice(-1, 1)[0];
          this.datosInspeccion = data.datosInspeccion;
        }
        this.datosTasaPeriodo = data.datosTasaPeriodo;
        this.loading = false;
        setTimeout(() => {
          this.dtTrigger.next();
        }, 100);
        this.blockVisualizarDatos.stop();
      }, (err) => {
        this.loading = false;
        this.blockVisualizarDatos.stop();
        console.error(err);
      });
  }

  generarTasa() {
    this.loadingInsertar = true;
    if (this.datosTasaPeriodo.length > 0 && +this.datosTasaPeriodo[0].contribuyente !== 0) {
      this.mensajeConfirmacion = 'LA TASA DE INSPECCION PARA EL AÑO EN CURSO YA FUE GENERADA, VERIFIQUE SU CUENTA CORRIENTE';
      this.loadingInsertar = false;
      $(this.confirmacionModal.nativeElement).modal('show');
    } else {
      const body = {
        estructuraId: 0
      };
      this.insertarInstalacionSubscription = this.estructurasAntenasService.insertarInstalacionTasa(body)
        .subscribe((data: any) => {
          console.log(data);
          this.consultarDatosInspeccion();
          this.mensajeConfirmacion = `La obligación asociada a la Tasa de Verificación para el año ${this.thisYear} fue generada con éxito`;
          this.loadingInsertar = false;
          $(this.confirmacionModal.nativeElement).modal('show');
        }, (err) => {
          this.loadingInsertar = false;
          console.error(err);
        });
    }
  }

  cerrarModal() {
    this.mensajeConfirmacion = undefined;
    $(this.confirmacionModal.nativeElement).modal('hide');
  }

  ngOnDestroy(): void {
    if (this.datosInspeccionSubscription) {
      this.datosInspeccionSubscription.unsubscribe();
    }
    if (this.insertarInstalacionSubscription) {
      this.insertarInstalacionSubscription.unsubscribe();
    }
  }

}
