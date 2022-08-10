import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { AutomotoresService } from '../../automotores.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

declare const $: any;
declare const DataTables: any;

@Component({
  selector: 'app-consulta-constancia-deuda',
  templateUrl: './consulta-constancia-deuda.component.html'
})
export class ConsultaConstanciaDeudaComponent implements OnInit, OnDestroy {

  form: FormGroup;
  loading = false;
  submitted = false;
  loginAutoSubscription: Subscription;
  constanciaRegularizacion;
  errorDominio;
  errorGeneral;

  constructor(
    private automotoresService: AutomotoresService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      nroConstancia: [null, Validators.required],
      clave: [null, Validators.required]
    }, {updateOn: 'blur'});
  }

  get f() { return this.form.controls; }

  onSubmit() {
    this.constanciaRegularizacion = undefined;
    this.submitted = true;
    const nroConstancia = this.form.get('nroConstancia').value;
    const clave = this.form.get('clave').value;
    if (this.form.valid) {
      this.loading = true;
      const body = {
        nroConstancia,
        clave
      };
      this.loginAutoSubscription = this.automotoresService.consultaConstanciaRegularizacion(body)
        .subscribe((data) => {
          console.log(data);
          this.errorGeneral = undefined;
          this.constanciaRegularizacion = data;
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
          this.constanciaRegularizacion = undefined;
          this.loading = false;
        });
    }
  }

  ngOnDestroy(): void {
    if (this.loginAutoSubscription) {
      this.loginAutoSubscription.unsubscribe();
    }
  }

}
