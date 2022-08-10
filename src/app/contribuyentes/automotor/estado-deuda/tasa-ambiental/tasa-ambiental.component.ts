import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { AutomotoresService } from '../../automotores.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import * as FileSaver from 'file-saver';

declare const $: any;
declare const DataTables: any;

@Component({
  selector: 'app-tasa-ambiental-estado-deuda',
  templateUrl: './tasa-ambiental.component.html'
})
export class TasaAmbientalComponent implements OnInit, OnDestroy {

  form: FormGroup;
  formBuscar: FormGroup;
  loading = false;
  submitted = false;
  loadingBuscar = false;
  submittedBuscar = false;
  loginAutoSubscription: Subscription;
  imprimirSubscription: Subscription;
  estadoCuenta;
  anioActual = +moment().format('YYYY');
  errorDominio;
  errorGeneral;

  datosDeConsulta = {
    dominio: ''
  };

  constructor(
    private automotoresService: AutomotoresService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      dominio: [null, Validators.required],
      clave: [null, Validators.required]
    }, {updateOn: 'blur'});
    this.formBuscar = this.fb.group({
      anioInicio: [null, Validators.required],
      anioFin: [null, Validators.required]
    }, {updateOn: 'blur'});
  }

  get f() { return this.form.controls; }
  get fr() { return this.formBuscar.controls; }

  onSubmit() {
    this.estadoCuenta = false;
    this.datosDeConsulta = {
      dominio: ''
    };
    this.estadoCuenta = undefined;
    this.submitted = true;
    const dominio = this.form.get('dominio').value;
    const clave = this.form.get('clave').value;

    if (this.form.valid && (dominio || clave)) {
      this.loading = true;
      const body = {
        dominio,
        clave,
        impuesto: '0042'
      };
      this.loginAutoSubscription = this.automotoresService.estadoCuentaAuto(body)
        .subscribe((data) => {
          this.datosDeConsulta = {
            dominio
          };
          console.log(data);
          this.errorDominio = undefined;
          this.errorGeneral = undefined;
          this.estadoCuenta = data;
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
          this.estadoCuenta = undefined;
          this.loading = false;
        });
    }
  }

  buscarEstadoCuenta() {
    const body = {
      dominio: this.datosDeConsulta.dominio,
      titular: this.estadoCuenta.datosContribuyente.razonSocial,
      domicilio: this.estadoCuenta.domicilioImponible.domicilio,
      modelo: this.estadoCuenta.login.modelo,
      desde: this.formBuscar.get('anioInicio').value + '01',
      hasta: this.formBuscar.get('anioFin').value + '12',
      textoImpuesto: 'Tasa Protección Ambiental - Automotor',
      tipoImponible: '0006',
      impuesto: '0042',
      claveImponible: this.estadoCuenta.login.clave,
      concepto: '0006'
    };
    this.loadingBuscar = true;
    this.imprimirSubscription = this.automotoresService.imprimirEstadoCuentaAutomotor(body)
      .subscribe((response: any) => {
        this.loading = false;
        const blob = new Blob([response], {
          type: 'application/pdf'
        });
        FileSaver.saveAs(blob, `estado_cuenta_tasa_ambiental_${this.datosDeConsulta.dominio}.pdf`);
        this.loadingBuscar = false;
      }, () => {
        this.loadingBuscar = false;
      });
  }

  ngOnDestroy(): void {
    if (this.loginAutoSubscription) {
      this.loginAutoSubscription.unsubscribe();
    }
    if (this.imprimirSubscription) {
      this.imprimirSubscription.unsubscribe();
    }
  }

}
