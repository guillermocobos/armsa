import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { AutomotoresService } from '../../automotores.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as FileSaver from 'file-saver';

declare const $: any;
declare const DataTables: any;

@Component({
  selector: 'app-historial-multas-transito',
  templateUrl: './historial-multas-transito.component.html'
})
export class HistorialMultasTransitoComponent implements OnInit, OnDestroy {

  form: FormGroup;
  loading = false;
  submitted = false;
  loadingImprimir = false;
  loginAutoSubscription: Subscription;
  imprimirSubscription: Subscription;
  multas;
  errorDominio;
  errorGeneral;

  letras;
  numeros;

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
  }

  get f() { return this.form.controls; }

  onSubmit() {
    this.multas = false;
    this.datosDeConsulta = {
      dominio: ''
    };
    this.submitted = true;
    const dominio = this.form.get('dominio').value;
    const clave = this.form.get('clave').value;
    if (dominio) {
      if (dominio.length < 6 || dominio.length > 7) {
        this.errorDominio = 'El formato del dominio es incorrecto';
      } else {
        /*if (dominio.length === 7) {
          this.letras = dominio.substring(0, 3);
          this.numeros = dominio.substring(4, 7);
          this.errorDominio = undefined;
        } else {
          this.letras = dominio.substring(0, 1);
          this.numeros = dominio.substring(2, 9);
          this.errorDominio = undefined;
        }*/
      }
      /*if (!this.letras || !this.numeros) {
        this.errorDominio = 'El formato del dominio es incorrecto';
      }*/
      if (dominio.indexOf('-') !== -1) {
        this.errorDominio = 'El formato del dominio es incorrecto';
      } else {
        this.errorDominio = undefined;
      }
    }
    if (this.form.valid && (dominio || clave) && !this.errorDominio) {
      this.loading = true;
      const body = {
        dominio: dominio,
        clave
      };
      this.loginAutoSubscription = this.automotoresService.historialMultasAuto(body)
        .subscribe((data) => {
          this.datosDeConsulta = {
            dominio
          };
          console.log(data);
          this.errorDominio = undefined;
          this.errorGeneral = undefined;
          this.multas = data;
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
          this.multas = undefined;
          this.loading = false;
        });
    }
  }

  imprimirHistorial() {
    const body = {
      dominio: this.datosDeConsulta.dominio,
      letras: this.letras,
      numeros: this.numeros
    };
    this.loadingImprimir = true;
    this.imprimirSubscription = this.automotoresService.imprimirHistorialMultas(body)
      .subscribe((response: any) => {
        this.loading = false;
        const blob = new Blob([response], {
          type: 'application/pdf'
        });
        FileSaver.saveAs(blob, `historial_multas_${body.dominio.trim()}.pdf`);
        this.loadingImprimir = false;
      }, () => {
        this.loadingImprimir = false;
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
