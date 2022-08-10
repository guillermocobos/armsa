import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DynamicScriptLoaderService } from '../../dynamic-script-loader-service.service';
import { ContribuyentesService } from '../contribuyentes.service';
import * as moment from 'moment';

declare const $: any;

@Component({
  selector: 'app-calculo-intereses',
  templateUrl: './calculo-intereses.component.html'
})
export class CalculoInteresesComponent implements OnInit, OnDestroy {

  form: FormGroup;
  loading = false;
  submitted = false;
  errorCalculoIntereses;
  interesCalculado;
  importeTotal;

  impuestos = [
    { id: '00081', name: 'Inmobiliario Urbano' },
    { id: '00082', name: 'T.G.I.' },
    { id: '00083', name: 'Impuesto Automotor' },
    { id: '00084', name: 'Tasa de Protección Ambiental' },
    { id: '00085', name: 'PROCOM' },
    { id: '00086', name: 'Régimen General' },
    { id: '00087', name: 'Régimen Simplificado' },
    { id: '00088', name: 'Publicidad y Propaganda' }
  ];

  datepickerOptions = {
    format: 'DD/MM/YYYY',
    weekStart: 1,
    time: false,
    lang: 'es',
    cancelText: 'Cancelar',
    switchOnClick: true
  };

  private validarSubscription: Subscription;
  private valueChangesSubscription: Subscription;

  constructor(
    private fb: FormBuilder,
    private contribuyentesService: ContribuyentesService,
    private dynamicScriptLoader: DynamicScriptLoaderService) { moment.locale('es'); }

  ngOnInit() {
    this.form = this.fb.group({
      impuesto: [null, [Validators.required]],
      importe_original: [null, [Validators.required, Validators.pattern(/^[0-9]\d*(\.\d+)?$/)]],
      vencimiento_original: [null, Validators.required],
      fecha_pago: [null, Validators.required]
    }, {updateOn: 'blur'});
    setTimeout(() => {
      this.startScript();
    });
    this.onChanges();
  }

  startScript() {
    this.dynamicScriptLoader.load('form.min').then(data => {
      this.cargarCalendars();
    }).catch(error => console.log(error));
  }

  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.form.valid) {
      this.loading = true;
      this.validarSubscription = this.contribuyentesService.calcularIntereses(this.form.value)
        .subscribe((data: any) => {
          this.importeTotal = data.result.toFixed(2);
          this.interesCalculado = (this.importeTotal - this.form.get('importe_original').value).toFixed(2);
          this.loading = false;
        }, (err) => {
          this.loading = false;
        });
    }
  }

  onReset() {
    this.form.reset();
    this.submitted = false;
  }

  ngOnDestroy() {
    if (this.validarSubscription) {
      this.validarSubscription.unsubscribe();
    }
    if (this.valueChangesSubscription) {
      this.valueChangesSubscription.unsubscribe();
    }
  }

  private cargarCalendars() {
    $('#vencimiento_original').bootstrapMaterialDatePicker(this.datepickerOptions).on('change', (e, date) => {
      this.form.get('vencimiento_original').setValue(moment(date).format('DD/MM/YYYY'));
    });
    $('#vencimiento_original').bootstrapMaterialDatePicker('setMaxDate', new Date());
    $('#fecha_pago').bootstrapMaterialDatePicker(this.datepickerOptions).on('change', (e, date) => {
      this.form.get('fecha_pago').setValue(moment(date).format('DD/MM/YYYY'));
    });
    $('#fecha_pago').bootstrapMaterialDatePicker('setMinDate', new Date());
  }

  onChanges(): void {
    this.valueChangesSubscription = this.form.valueChanges.subscribe(val => {
      this.interesCalculado = undefined;
      this.importeTotal = undefined;
    });
  }
}
