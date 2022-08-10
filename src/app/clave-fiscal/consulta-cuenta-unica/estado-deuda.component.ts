import {
  AfterViewInit,
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
import { Subscription } from 'rxjs';
import { EstadoDeudaCabeceraModel } from '../../models/estado-deuda-cabecera.model';
import { EstadoDeudaImponibleModel } from '../../models/estado-deuda-imponible.model';
import { ClaveFiscalService } from '../clave-fiscal.service';
import * as moment from 'moment';

declare const $: any;

@Component({
  selector: 'app-estado-deuda',
  templateUrl: './estado-deuda.component.html'
})
export class EstadoDeudaComponent implements OnInit, OnDestroy {

  @Input() tipoImponible;
  @Input() claveImponible;
  @Input() impuesto;
  @Output() datosCargados = new EventEmitter();

  @ViewChild('anioDesde', {static: true}) anioDesdeEl: ElementRef;
  @ViewChild('anioHasta', {static: true}) anioHastaEl: ElementRef;

  @BlockUI('carga-estado-deuda') blockCargaEstadoDeuda: NgBlockUI;

  estadoDeudaSubscription: Subscription;
  cabeceraLibreDeuda: EstadoDeudaCabeceraModel;
  estadoDeudaImp: EstadoDeudaImponibleModel[];
  conceptoImpuesto;
  formDeuda: FormGroup;
  ready = false;
  intimacionProcom = false;

  yearPickerOptions = {
    minViewMode: 4,
    startView: 4,
    minView: 4,
    format: 'yyyy',
    language: 'es',
    autoclose: true,
    bootcssVer: 4,
    endDate: new Date()
  };

  constructor(
    private claveFiscalService: ClaveFiscalService,
    private fb: FormBuilder
  ) {
    moment.locale('es');
  }

  ngOnInit() {
    this.formDeuda = this.fb.group({
      anioDesde: [moment().format('YYYY'), [Validators.required]],
      anioHasta: [moment().format('YYYY'), [Validators.required]],
    }, {updateOn: 'blur'});
    this.cargarCalendars();
    this.mostrarEstadoDeuda();
  }

  mostrarEstadoDeuda() {
    this.ready = false;
    this.blockCargaEstadoDeuda.start();
    const body = {
      tipoImponible: this.tipoImponible,
      claveImponible: this.claveImponible,
      impuesto: this.impuesto,
      desde: this.formDeuda.get('anioDesde').value,
      hasta: this.formDeuda.get('anioHasta').value
    };
    this.estadoDeudaSubscription = this.claveFiscalService.consultaEstadoDeuda(body)
      .subscribe((response) => {
        this.cabeceraLibreDeuda = response.cabeceraLibreDeuda;
        this.estadoDeudaImp = response.estadoDeudaImp;
        if (this.estadoDeudaImp[0]) {
          this.conceptoImpuesto = this.estadoDeudaImp[0].impuestoAbrev + ' / ' + this.estadoDeudaImp[0].conceptoObligacionAbrev;
        }
        this.intimacionProcom = response.intimacionProcom;
        this.datosCargados.emit(true);
        this.blockCargaEstadoDeuda.stop();
        this.ready = true;
      });
  }

  private cargarCalendars() {
    $(this.anioDesdeEl.nativeElement).datetimepicker(this.yearPickerOptions, {bootcssVer: 4}).on('change', (event) => {
      this.formDeuda.get('anioDesde').setValue(event.target.value);
    });
    $(this.anioHastaEl.nativeElement).datetimepicker(this.yearPickerOptions, {bootcssVer: 4}).on('change', (event) => {
      this.formDeuda.get('anioHasta').setValue(event.target.value);
    });
  }

  consultarPeriodo() {
    this.mostrarEstadoDeuda();
  }

  ngOnDestroy() {
    if (this.estadoDeudaSubscription) {
      this.estadoDeudaSubscription.unsubscribe();
    }
  }
}
