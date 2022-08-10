import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { AutomotoresService } from '../../automotores.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import * as FileSaver from 'file-saver';

declare const $: any;
declare const DataTables: any;

@Component({
  selector: 'app-solicitud-constancia-deuda',
  templateUrl: './solicitud-constancia-deuda.component.html'
})
export class SolicitudConstanciaDeudaComponent implements OnInit, OnDestroy {

  form: FormGroup;
  loading = false;
  submitted = false;
  loadingImprimir = false;
  submittedImprimir = false;
  solicitudConstanciaRegularizacionSubscription: Subscription;
  imprimirSubscription: Subscription;
  planesPago;
  errorDominio;
  errorGeneral;


  datosDeConsulta = {
    dominio: '',
    clave: '',
    solicitante: '',
    dni: '',
    domicilio: '',
    telefono: '',
    email: ''
  };

  constructor(
    private automotoresService: AutomotoresService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      solicitante: [null, Validators.required],
      dni: [null],
      domicilio: [null],
      telefono: [null],
      email: [null],
      dominio: [null, Validators.required],
      clave: [null, Validators.required]
    }, {updateOn: 'blur'});
  }

  get f() { return this.form.controls; }

  onSubmit() {
    this.planesPago = false;
    this.datosDeConsulta = {
      dominio: '',
      clave: '',
      solicitante: '',
      dni: '',
      domicilio: '',
      telefono: '',
      email: ''
    };
    this.submitted = true;
    if (this.form.valid) {
      this.loading = true;
      const body = {
        dominio: this.form.get('dominio').value,
        clave: this.form.get('clave').value,
        solicitante: this.form.get('solicitante').value,
        dni:this.form.get('dni').value,
        domicilio: this.form.get('domicilio').value,
        telefono: this.form.get('telefono').value,
        email: this.form.get('email').value
      };
      this.solicitudConstanciaRegularizacionSubscription = this.automotoresService.solicitudConstanciaRegularizacion(body)
        .subscribe((data) => {
          this.datosDeConsulta = body;
          console.log(data);
          this.errorDominio = undefined;
          this.errorGeneral = undefined;
          this.planesPago = data;
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
          this.planesPago = undefined;
          this.loading = false;
        });
    }
  }

  ngOnDestroy(): void {
    if (this.solicitudConstanciaRegularizacionSubscription) {
      this.solicitudConstanciaRegularizacionSubscription.unsubscribe();
    }
    if (this.imprimirSubscription) {
      this.imprimirSubscription.unsubscribe();
    }
  }

  imprimirConstancia() {
    this.submittedImprimir = true;
    this.loadingImprimir = true;
    const body = {
      personaId: this.planesPago.login.personaId,
      dominio: this.datosDeConsulta.dominio,
      clave_auto: this.datosDeConsulta.clave,
      nombreApellido: this.datosDeConsulta.solicitante,
      documento: this.datosDeConsulta.dni,
      domicilio: this.datosDeConsulta.domicilio,
      telefono: this.datosDeConsulta.telefono,
      email: this.datosDeConsulta.email,
      clave_imponible: this.planesPago.login.clave,
    };
    this.imprimirSubscription = this.automotoresService.imprimirConstanciaRegularizacionAutomotor(body)
      .subscribe((response: any) => {
        this.submittedImprimir = false;
        this.loadingImprimir = false;
        const blob = new Blob([response], {
          type: 'application/pdf'
        });
        FileSaver.saveAs(blob, `constancia_deuda_regularizada_${this.datosDeConsulta.dominio}.pdf`);
      }, () => {
        this.loadingImprimir = false;
      });
  }

}
