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
import { EstadoDeudaPlanCabeceraModel } from '../../models/estado-deuda-plan-cabecera.model';
import { EstadoDeudaPlanCuotaModel } from '../../models/estado-deuda-plan-cuota.model';
import { EstadoDeudaPlanVencidaHistModel } from '../../models/estado-deuda-plan-vencida-hist.model';
import { EstadoDeudaPlanVencidaModel } from '../../models/estado-deuda-plan-vencida.model';
import { ClaveFiscalService } from '../clave-fiscal.service';
import * as moment from 'moment';

declare const $: any;

@Component({
  selector: 'app-estado-deuda-planes',
  templateUrl: './estado-deuda-planes.component.html',
  styles: [`
    #estadoDeudaCabecera .col-xs-12 {
      margin-bottom: 0px !important;
    }
    #estadoDeudaCabecera .col-xs-12 span {
      font-size: 12px;
      margin-left: 5px;
    }
    #estadoDeudaCabecera .col-xs-12 hr {
      margin-top: 5px;
      margin-bottom: 5px;
    }
  `]
})
export class EstadoDeudaPlanesComponent implements OnInit, OnDestroy {

  @Input() planFacilidad;
  @Output() datosCargados = new EventEmitter();

  @ViewChild('anioDesde', {static: true}) anioDesdeEl: ElementRef;
  @ViewChild('anioHasta', {static: true}) anioHastaEl: ElementRef;

  @BlockUI('carga-estado-deuda') blockCargaEstadoDeuda: NgBlockUI;

  estadoDeudaSubscription: Subscription;
  estadoDeudaCabecera: EstadoDeudaPlanCabeceraModel;
  cuotasPlan: EstadoDeudaPlanCuotaModel[];
  estadoDeudaPlanVencidas: EstadoDeudaPlanVencidaModel[];
  estadoDeudaPlanVencidasHist: EstadoDeudaPlanVencidaHistModel[];
  conceptoImpuesto;
  formDeuda: FormGroup;
  ready = false;
  intimacionProcom = false;
  totalCuotas;
  totalVencidas;

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
    this.mostrarEstadoDeuda();
  }

  mostrarEstadoDeuda() {
    this.ready = false;
    this.blockCargaEstadoDeuda.start();
    this.estadoDeudaSubscription = this.claveFiscalService.consultaEstadoDeudaPlanes(this.planFacilidad)
      .subscribe((response) => {
        this.estadoDeudaCabecera = response.estadoDeudaCabecera;
        this.cuotasPlan = response.estadoDeudaPlanCuotas;
        this.estadoDeudaPlanVencidas = response.estadoDeudaPlanVencidas.map((vencida) => {
          //vencida.importeActualizado = Number(vencida.importeActualizado.toFixed(2)); //JSilva, Incid109352
          vencida.importeActualizado = Number(vencida.importeActualizado).toFixed(2);  //JSilva, Incid109352
          return vencida;
        });
        this.estadoDeudaPlanVencidasHist = response.estadoDeudaPlanVencidasHist;
        this.totalCuotas = this.cuotasPlan.reduce((total, obj: any) => {
          return total + Number(obj.importeCuota); //JSilva, Incid109352, se agregó Number()
        }, 0);
        this.totalCuotas = Number(this.totalCuotas).toFixed(2); //JSilva, Incid109352, se agregó redondeo        

        this.totalVencidas = this.estadoDeudaPlanVencidas.reduce((total, obj: any) => {
          return total + Number(obj.importeActualizado); //JSilva, Incid109352, se agregó Number()
        }, 0);
        this.totalVencidas = Number(this.totalVencidas).toFixed(2); //JSilva, Incid109352, se agregó redondeo 

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
