import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AuthenticationService } from '../../../authentication/signin/authentication.service';
import { ClaveFiscalService } from '../../clave-fiscal.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import * as moment from "moment";
import * as FileSaver from "file-saver";
import cuitValidator from "../../../shared/helpers/validators/cuit-validator";
import {LibreDeudasService} from "../libre-deudas.service";
import {DynamicScriptLoaderService} from "../../../dynamic-script-loader-service.service";
import {Router} from "@angular/router";

declare const $: any;

@Component({
  selector: 'app-solicitud-libre-deudas',
  templateUrl: './solicitud-libre-deudas.component.html',
  styles: [`
    .select200 {
      height: 200px;
    }
  `]
})
export class SolicitudLibreDeudasComponent implements OnInit, OnDestroy {
  contribuyente;
  personaId;
  loading = false;

  form: FormGroup;
  submitted = false;

  fechaHoy = moment().format('DD/MM/YYYY');

  tiposImponibles = [];
  imponibles = [];
  tiposImponiblesSubscription: Subscription;
  imponiblesSubscription: Subscription;
  tieneDeudaSubscription: Subscription;
  generarCertificadoSubscription: Subscription;

  mensajeGenerarCertificado;
  certificadoGenerado = false;

  @BlockUI('visualizar-datos') blockVisualizarDatos: NgBlockUI;
  @BlockUI('get-tipos-imponibles') blockTiposImponibles: NgBlockUI;
  @BlockUI('get-imponibles') blockImponibles: NgBlockUI;

  @ViewChild('mostrarMensajeModal', {static: true}) mostrarMensajeModal: ElementRef;

  datepickerOptions = {
    format: 'DD/MM/YYYY',
    weekStart: 1,
    time: false,
    lang: 'es',
    cancelText: 'Cancelar',
    switchOnClick: true
  };

  constructor(
    private authService: AuthenticationService,
    private claveFiscalService: ClaveFiscalService,
    private fb: FormBuilder,
    private libreDeudasService: LibreDeudasService,
    private dynamicScriptLoader: DynamicScriptLoaderService,
    private router: Router
  ) {}

  ngOnInit() {
    this.personaId = this.authService.getSessionUserId();
    this.contribuyente = this.authService.getContribuyenteSesion();


    this.form = this.fb.group({
      tipoImponible: [null, Validators.required],
      tipoCertificado: [null, Validators.required],
      imponible: [null, Validators.required],
      lugarPresentacion: [null, Validators.required],
      fechaCalculo: [moment().format('DD/MM/YYYY'), Validators.required],
      domicilioSolicitante: [''],
    });

    setTimeout(() => {
      this.startScript();
    });
  }

  getTiposImponibles(event) {
    const tipoCertificado = event.target.value;
    if (tipoCertificado) {
      this.blockTiposImponibles.start();
      this.tiposImponiblesSubscription = this.libreDeudasService.getTiposImponibles(tipoCertificado)
        .subscribe((tiposImponibles) => {
          this.tiposImponibles = tiposImponibles;
          this.blockTiposImponibles.stop();
        });
    }
  }

  getImponibles(event) {
    const tipoImponible = event.target.value;
    if (tipoImponible) {
      this.blockImponibles.start();
      this.imponiblesSubscription = this.libreDeudasService.getImponibles(tipoImponible)
        .subscribe((imponibles) => {
          this.imponibles = imponibles;
          this.blockImponibles.stop();
        });
    }
  }

  startScript() {
    this.dynamicScriptLoader.load('form.min').then(data => {
      this.cargarCalendars();
    }).catch(error => console.log(error));
  }

  private cargarCalendars() {
    $('#fechaCalculo').bootstrapMaterialDatePicker(this.datepickerOptions).on('change', (e, date) => {
      this.form.get('fechaCalculo').setValue(moment(date).format('DD/MM/YYYY'));
    });
    $('#fechaCalculo').bootstrapMaterialDatePicker('setMaxDate', new Date());
  }


  get fa() {
    return this.form.controls;
  }

  generarSolicitud() {
    this.submitted = true;
    this.loading = true;
    if (this.form.valid) {
      const hash = Math.floor(Math.random() * 16777215).toString(12);
      const body = {
        hash,
        tipoCertificado: this.form.get('tipoCertificado').value,
        tipoImponible: this.form.get('tipoImponible').value,
        claveImponible: this.form.get('imponible').value,
        nombreSolicitante: this.contribuyente.razon_social,
        dniSolicitante: this.contribuyente.nro_documento,
        domicilioSolicitante: this.form.get('domicilioSolicitante').value,
        lugarPresentacion: this.form.get('lugarPresentacion').value,
        fechaCalculo: this.form.get('fechaCalculo').value
      };
      this.tieneDeudaSubscription = this.libreDeudasService.tieneDeuda(body)
        .subscribe((tieneDeuda) => {
          if (tieneDeuda.tieneDeuda === 1) {
            // mostrar cartel con deuda
            this.mensajeGenerarCertificado = 'El imponible seleccionado registra DEUDAS. Puede cancelar las mismas mediante las opciones de pago habilitadas en la web o en cualquier Dependencia Municipal'
            $(this.mostrarMensajeModal.nativeElement).modal('show');
            this.submitted = false;
            this.loading = false;
          } else {
            this.generarCertificadoSubscription = this.libreDeudasService.generarCertificado(body)
              .subscribe((response) => {
                if (response.result) {
                  this.mensajeGenerarCertificado = response.result;
                  $(this.mostrarMensajeModal.nativeElement).modal('show');
                } else {
                  this.mensajeGenerarCertificado = 'Su certificado ha sido generado exitosamente.';
                  this.certificadoGenerado = true;
                  $(this.mostrarMensajeModal.nativeElement).modal('show');
                }
                this.submitted = false;
                this.loading = false;
              }, (error) => { this.loading = false; });
          }
        }, (error) => { this.loading = false; });
    } else {
      this.loading = false;
    }

  }

  volver() {
    this.cerrarModal();
    this.router.navigate(['/clave-fiscal/libre-deudas']);
  }

  cerrarModal() {
    this.mensajeGenerarCertificado = undefined;
    $(this.mostrarMensajeModal.nativeElement).modal('hide');
  }


  ngOnDestroy(): void {
    if (this.tiposImponiblesSubscription) {
      this.tiposImponiblesSubscription.unsubscribe();
    }
  }

}
