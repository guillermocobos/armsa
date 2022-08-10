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
  selector: 'app-tgi-estado-deuda',
  templateUrl: './tgi.component.html'
})
export class TgiComponent implements OnInit, OnDestroy {

  form: FormGroup;
  formBuscar: FormGroup;
  loading = false;
  submitted = false;
  loadingBuscar = false;
  submittedBuscar = false;
  estadoCuentaSubscription: Subscription;
  loginInmobiliarioSubscription: Subscription;
  imprimirSubscription: Subscription;
  datosActaInfraccionSubscription: Subscription;
  estadoCuenta;
  anioActual = +moment().format('YYYY');
  errorDominio;
  errorGeneral;
  multaSelected;
  datosActaInfracciones;
  showModal = false;

  letras;
  numeros;

  @BlockUI('visualizar-datos') blockVisualizarDatos: NgBlockUI;
  @ViewChild('fechaPago', {static: false}) fechaPagoEl: ElementRef;

  constructor(
    private inmobiliarioService: InmobiliarioService,
    private fb: FormBuilder,
    private dynamicScriptLoader: DynamicScriptLoaderService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      catastro: [null],
      clave: [null]
    }, {updateOn: 'blur'});
    this.formBuscar = this.fb.group({
      anioInicio: [null, Validators.required],
      anioFin: [null, Validators.required]
    }, {updateOn: 'blur'});
  }


  get f() { return this.form.controls; }
  get fr() { return this.formBuscar.controls; }

  onSubmit() {
    this.estadoCuenta = undefined;
    this.submitted = true;
    const catastro = this.form.get('catastro').value;
    const clave = this.form.get('clave').value;

    if (this.form.valid && (catastro || clave)) {
      this.loading = true;
      const body = {
        catastro: catastro,
        clave
      };
      this.loginInmobiliarioSubscription = this.inmobiliarioService.estadoCuentaInmobiliario(body)
        .subscribe((data) => {
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
      catastro: this.form.get('catastro').value,
      titular: this.estadoCuenta.datosContribuyente.razonSocial,
      domicilio: this.estadoCuenta.domicilioImponible.domicilio,
      modelo: this.estadoCuenta.login.modelo,
      desde: this.formBuscar.get('anioInicio').value + '01',
      hasta: this.formBuscar.get('anioFin').value + '12',
      textoImpuesto: 'Tasa General de Inmuebles',
      tipoImponible: '0007',
      impuesto: '0008',
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
        FileSaver.saveAs(blob, `estado_cuenta_tgi_${this.form.get('catastro').value}.pdf`);
        this.loadingBuscar = false;
      }, () => {
        this.loadingBuscar = false;
      });
  }

  ngOnDestroy(): void {
    if (this.estadoCuentaSubscription) {
      this.estadoCuentaSubscription.unsubscribe();
    }
    if (this.loginInmobiliarioSubscription) {
      this.loginInmobiliarioSubscription.unsubscribe();
    }
    if (this.imprimirSubscription) {
      this.imprimirSubscription.unsubscribe();
    }
    if (this.datosActaInfraccionSubscription) {
      this.datosActaInfraccionSubscription.unsubscribe();
    }
  }

}
