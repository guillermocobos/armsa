import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import * as moment from 'moment';
import { ClaveFiscalService } from '../../clave-fiscal.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { AuthenticationService } from '../../../authentication/signin/authentication.service';
import { BotonPagoService } from '../boton-pago.service';
import { OpemTributoConceptoModel } from '../../../models/opem-tributo-concepto.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

declare const $: any;
declare const DataTables: any;

@Component({
  selector: 'app-generacion-opem',
  templateUrl: './generacion-opem.component.html'
})
export class GeneracionOpemComponent implements OnInit, OnDestroy {

  form: FormGroup;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any>;
  dtTriggerPeriodos: Subject<any>;
  loading = false;
  tributosSubscription: Subscription;
  periodosSubscription: Subscription;
  tributosConceptos: any[] = [];
  periodosOPE: any[] = [];
  @BlockUI('visualizar-datos') blockVisualizarDatos: NgBlockUI;
  @ViewChild('mesAnioDesde', {static: true}) mesAnioDesdeEl: ElementRef;
  @ViewChild('mesAnioHasta', {static: true}) mesAnioHastaEl: ElementRef;

  tributosSelected = [];
  periodosSelected = [];
  tributoSelected: OpemTributoConceptoModel;
  selectAllChecked = false;
  numeroOPE;
  loadingButton = false;
  totalPagar = 0;
  deudaTotal = 0;

  monthYearPickerOptions = {
    minViewMode: 3,
    startView: 3,
    minView: 3,
    format: 'mm-yyyy',
    language: 'es',
    autoclose: true,
    bootcssVer: 4,
    endDate: new Date()
  };

  constructor(
    private botonPagoService: BotonPagoService,
    private authService: AuthenticationService,
    private fb: FormBuilder
  ) {
    moment.locale('es');
  }

  ngOnInit(): void {
    this.dtOptions = {
      pageLength: 10,
      pagingType: 'first_last_numbers',
      language: {
        url: '//cdn.datatables.net/plug-ins/1.10.19/i18n/Spanish.json'
      },
      columnDefs: [{
        orderable: false,
        targets: 0
      }],
      order: [[ 1, 'asc' ]]
    };
    this.form = this.fb.group({
      metodoPago: [null],
      periodoDesde: [null, Validators.required],
      periodoHasta: [null, Validators.required]
    }, {updateOn: 'blur'});
    this.consultarTributosConceptos();
    this.cargarCalendars();
  }

  private cargarCalendars() {
    $(this.mesAnioDesdeEl.nativeElement).datetimepicker(this.monthYearPickerOptions, {bootcssVer: 4}).on('change', (event) => {
      this.form.get('periodoDesde').setValue(event.target.value);
    });
    $(this.mesAnioHastaEl.nativeElement).datetimepicker(this.monthYearPickerOptions, {bootcssVer: 4}).on('change', (event) => {
      this.form.get('periodoHasta').setValue(event.target.value);
    });
  }

  consultarTributosConceptos() {
    this.loading = true;
    this.blockVisualizarDatos.start();
    const personaId = this.authService.getSessionUserId();
    this.tributosSubscription = this.botonPagoService.consultaTributosConceptos(personaId)
      .subscribe((tributos: OpemTributoConceptoModel[]) => {
        this.dtTrigger = new Subject();
        this.tributosConceptos = tributos.map((tributo) => {
          return {...tributo, selected: false};
        });
        this.loading = false;
        setTimeout(() => {
          this.dtTrigger.next(tributos);
        });
        this.blockVisualizarDatos.stop();
      }, (err) => {
        console.error(err);
      });
  }

  ngOnDestroy() {
    if (this.tributosSubscription) {
      this.tributosSubscription.unsubscribe();
    }
    if (this.dtTrigger) {
      this.dtTrigger.unsubscribe();
    }
  }

  onTributoChange(checked, tributo, row = false) {
    console.log('checked', checked);
    /*if (event.target.checked) {
      this.tributosSelected.push(tributo);
    } else {
      this.tributosSelected.splice(this.tributosSelected.findIndex((obj) => {
        return obj.claveImponible === tributo.claveImponible;
      }), 1);
    }*/
    if (!checked) {
      this.tributoSelected = tributo;
    } else {
      this.tributoSelected = undefined;
    }

    // this.selectAllChecked = this.tributosSelected.length === this.tributosConceptos.length;
    console.log(this.tributoSelected);
  }

  onSelectPeriodo(event, periodo) {
    if (event.target.checked) {
      this.periodosSelected.push(periodo);
    } else {
      this.periodosSelected.splice(this.periodosSelected.findIndex((obj) => {
        return obj.periodo === periodo.periodo;
      }), 1);
    }
    this.totalPagar = 0;
    this.periodosSelected.forEach((per) => {
      this.totalPagar += per.importe_adeudado;
    });
    this.selectAllChecked = this.periodosSelected.length === this.periodosOPE.length;
  }

  selectUnselectAll(event) {
    const checked = event.target.checked;
    this.selectAllChecked = checked;
    this.periodosSelected = checked ? this.periodosOPE : [];
    this.totalPagar = checked ? this.deudaTotal : 0;
    this.periodosOPE.forEach((periodo) => {
      return periodo.selected = checked;
    });
    this.dtTriggerPeriodos = new Subject();
    setTimeout(() => {
      this.dtTriggerPeriodos.next(this.periodosOPE);
    });
  }


  consultarPeriodo() {
    const periodoDesde = this.form.get('periodoDesde').value.split('-').reverse().join('');
    const periodoHasta = this.form.get('periodoHasta').value.split('-').reverse().join('');
    const body = this.tributoSelected as any;
    body.periodoDesde = periodoDesde;
    body.periodoHasta = periodoHasta;
    body.personaId = this.authService.getSessionUserId();
    this.loadingButton = true;
    this.periodosSubscription = this.botonPagoService.consultaPeriodosOPE(body)
      .subscribe((data) => {
        console.log(data);
        this.dtTriggerPeriodos = new Subject();
        this.periodosOPE = data.map((periodo) => {
          const adeudado = +periodo.importe_adeudado.toFixed(2);
          this.deudaTotal += adeudado;
          return {...periodo, selected: false, importe_adeudado: adeudado};
        });
        this.loading = false;
        setTimeout(() => {
          this.dtTriggerPeriodos.next(data);
          this.loadingButton = false;
        });
      });
  }
}
