import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { OpemTributoConceptoModel } from '../../../../models/opem-tributo-concepto.model';
import { Subject, Subscription } from 'rxjs';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { DynamicScriptLoaderService } from '../../../../dynamic-script-loader-service.service';
import * as FileSaver from 'file-saver';
import {InmobiliarioService} from "../../inmobiliario.service";

declare const $: any;
declare const DataTables: any;

@Component({
  selector: 'app-impuesto-inmobiliario-estado-deuda',
  templateUrl: './impuesto-inmobiliario.component.html'
})
export class ImpuestoInmobiliarioComponent implements OnInit, OnDestroy {

  form: FormGroup;
  formBuscar: FormGroup;
  loading = false;
  submitted = false;
  loadingBuscar = false;
  submittedBuscar = false;
  loginInmobiliarioSubscription: Subscription;
  imprimirSubscription: Subscription;
  estadoCuenta;
  anioActual = +moment().format('YYYY');
  errorDominio;
  errorGeneral;

  datosDeConsulta = {
    catastro: ''
  };

  @BlockUI('visualizar-datos') blockVisualizarDatos: NgBlockUI;
  @ViewChild('fechaPago', {static: false}) fechaPagoEl: ElementRef;

  constructor(
    private inmobiliarioService: InmobiliarioService,
    private fb: FormBuilder,
    private dynamicScriptLoader: DynamicScriptLoaderService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      catastro: [null, Validators.required],
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
    this.datosDeConsulta = {
      catastro: ''
    };
    this.estadoCuenta = undefined;
    this.submitted = true;
    const catastro = this.form.get('catastro').value;
    const clave = this.form.get('clave').value;

    if (this.form.valid && (catastro || clave)) {
      this.loading = true;
      const body = {
        catastro,
        clave
      };
      this.loginInmobiliarioSubscription = this.inmobiliarioService.estadoCuentaInmobiliario(body)
        .subscribe((data) => {
          this.datosDeConsulta = {
            catastro
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
      catastro: this.datosDeConsulta.catastro,
      titular: this.estadoCuenta.datosContribuyente.razonSocial,
      domicilio: this.estadoCuenta.domicilioImponible.domicilio,
      modelo: this.estadoCuenta.login.modelo,
      desde: this.formBuscar.get('anioInicio').value + '01',
      hasta: this.formBuscar.get('anioFin').value + '12',
      textoImpuesto: 'Impuesto Inmobiliario',
      tipoImponible: '0007',
      impuesto: '0007',
      claveImponible: this.estadoCuenta.login.clave,
      concepto: '0006'
    };
    this.loadingBuscar = true;
    // this.imprimirSubscription = this.inmobiliarioService.imprimirEstadoCuentaInmobiliario(body)
    this.imprimirSubscription = this.inmobiliarioService.imprimirEstadoDeudaPlan(body)
      .subscribe((response: any) => {
        this.loading = false;
        const blob = new Blob([response], {
          type: 'application/pdf'
        });
        FileSaver.saveAs(blob, `estado_cuenta_inmobiliario_${body.catastro}.pdf`);
        this.loadingBuscar = false;
      }, () => {
        this.loadingBuscar = false;
      });
  }

  ngOnDestroy(): void {
    if (this.loginInmobiliarioSubscription) {
      this.loginInmobiliarioSubscription.unsubscribe();
    }
    if (this.imprimirSubscription) {
      this.imprimirSubscription.unsubscribe();
    }
  }

}
