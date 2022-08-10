import {
  AfterViewChecked, AfterViewInit, ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input, OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { v1 as uuidv1 } from 'uuid';

import * as FileSaver from 'file-saver';
import {CtaCteUnificadaService} from "./cta-cte-unificada.service";
import {DynamicScriptLoaderService} from "../../dynamic-script-loader-service.service";
import {AuthenticationService} from "../../authentication/signin/authentication.service";

declare const $: any;
declare const DataTables: any;

export const MEDIO_PAGO_TARJETA = 3;
export const MEDIO_PAGO_BOLETA = 2;
export const MEDIO_PAGO_GENERICO = 4;

@Component({
  selector: 'app-cta-cte-unificada-grilla',
  templateUrl: './tabla-deudas.component.html',
  styleUrls: ['./tabla-deudas.component.scss']
})
export class TablaDeudasComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit {

  form: FormGroup;
  loading = false;
  submitted = false;
  consultaObligacionesSubscription: Subscription;
  generarDetallesVtosSubscription: Subscription;
  imprimirSubscription: Subscription;
  detallesSubscription: Subscription;
  errorDominio;
  errorGeneral;

  personaId;
  activeTab;
  tabs = [];
  obligaciones = [];
  obligacionesObj = {};
  obligacionSelected;
  deudasSelected = {};
  totalPagar = '0.00';
  totalImponible = {};
  loadingImprimir = false;
  mostrarCtaCteUnificada = true;
  mostrarFormularioTarjeta = false;
  mostrarFinalizacion = false;
  secuencia;
  mensajeExitoso;
  cabeceraId;
  seleccionarDeudaTotal = true;
  calendarLoaded = false;
  detalleDeuda;

  @BlockUI('visualizar-datos') blockVisualizarDatos: NgBlockUI;
  @ViewChild('fechaPago', {static: false}) fechaPagoEl: ElementRef;
  @ViewChild('tablaDetalleDeuda', {static: false}) tablaDetalleDeudaEl: ElementRef;

  @Input() soloDeuda = false;
  @Input() impuesto;
  @Input() concepto;
  @Input() medioPago = MEDIO_PAGO_BOLETA;
  @Input() tituloPagina = 'CUENTA CORRIENTE UNIFICADA';
  @Input() buttonText = 'Pagar por Boletas';
  @Input() loadingButton = false;
  @Input() refreshData = true;
  @Output() clickButton = new EventEmitter();
  @Output() finalizaCarga = new EventEmitter();

  datepickerOptions = {
    format: 'DD/MM/YYYY',
    weekStart: 1,
    time: false,
    lang: 'es',
    cancelText: 'Cancelar',
    switchOnClick: true
  };

  constructor(
    private ctaCteUnificadaService: CtaCteUnificadaService,
    private authService: AuthenticationService,
    private fb: FormBuilder,
    private dynamicScriptLoader: DynamicScriptLoaderService,
    private cdr: ChangeDetectorRef
  ) {
    moment.locale('es');
  }

  ngOnInit() {
    console.log('onInit');
    this.personaId = this.authService.getSessionUserId();
    this.form = this.fb.group({
      fechaPago: [moment().format('DD/MM/YYYY'), Validators.required]
    }, {updateOn: 'blur'});
    if (this.refreshData) {
      this.consultarObligaciones();
    }
  }

  startScript() {
      this.dynamicScriptLoader.load('form.min').then(data => {
        this.cdr.detectChanges();
        this.cargarCalendars();
        this.calendarLoaded = true;
      }).catch(error => console.log(error));
  }

  changeTab(tab) {
    this.activeTab = tab;
  }

  get f() { return this.form.controls; }

  onClickButton() {
    this.ctaCteUnificadaService.setActiveTab(this.activeTab);
    this.clickButton.emit({
      deudasSelected: this.deudasSelected,
      totalPagar: this.totalPagar,
      fechaPago: this.form.get('fechaPago').value
    });
  }

  consultarObligaciones() {
    this.obligacionesObj = {};
    this.tabs = [];
    this.submitted = true;
    if (this.form.valid) {
      this.loading = true;
      this.blockVisualizarDatos.start();
      const body = {
        fechaPago: this.form.get('fechaPago').value,
        personaId: this.authService.getSessionUserId(),
        medioPago: this.medioPago,
        soloDeuda: this.soloDeuda ? 'S' : 'N',
        impuesto: this.impuesto,
        concepto: this.concepto
      };
      this.consultaObligacionesSubscription = this.ctaCteUnificadaService.consultarObligaciones(body)
        .subscribe((data) => {
          let obligacionActual;
          let tipoImponibleDescr;
          for(let d of data) {
            if(d.nodo === '0000') {
              obligacionActual = d;
              obligacionActual['id'] = uuidv1();
              obligacionActual['selected'] = true;
              obligacionActual['detalles'] = [];
              obligacionActual['total'] = 0;
              const datosImponible = this.strip_tags(obligacionActual.datosImponible, ['span']);
              const datosImponibleObject = datosImponible.split('<span>').map((el) => el.split('</span>').map((el) => el.trim().replace(' :', '')));
              datosImponibleObject.splice(0, 1);
              obligacionActual['datosImponibleObj'] = datosImponibleObject;
              //console.log(datosImponibleObject);

              if (tipoImponibleDescr !== d.tipoImponibleDescr) {
                this.tabs.push(d.tipoImponibleDescr);
                tipoImponibleDescr = d.tipoImponibleDescr;
                this.obligacionesObj[d.tipoImponibleDescr] = [];
              }
              this.obligacionesObj[d.tipoImponibleDescr].push(obligacionActual);

            } else {
              d['interes'] = 0.00;
              d['estadoClass'] = d.estado ? d.estado.replace(/\s/g, "") : ''
              if(d.estado === 'Impago') {
                d['selected'] = true;
                d['deudaId'] = uuidv1();
                const interes = +d.importeActualizado - d.deudaActual;
                d['interes'] = interes.toFixed(2);
                d['importeActualizado'] = +d.importeActualizado;
                obligacionActual['total'] += +d.deudaActual.toFixed(2) + interes;
                obligacionActual.detalles.push(d);
              } else if(d.estado === 'No Vencida' || d.estado === 'Intimación/Impago' || d.estado === 'Cuota Anual') {
                d['deudaId'] = uuidv1();
                d['selected'] = false;
                obligacionActual.detalles.push(d);
              }

            }
          }

          for (let imponible in this.obligacionesObj) {
            if (this.soloDeuda) {
              this.obligacionesObj[imponible] = [...this.obligacionesObj[imponible].filter((obl) => {
                return this.tienePeriodosConDeuda(obl['detalles']);
              })];
            }
            for (let obl of this.obligacionesObj[imponible]) {
              const obligacionId = obl['id'];
              this.deudasSelected[obligacionId] = obl.detalles.filter((det) => {
                return det.estado === 'Impago';
              });
            }
          }
          this.recalcularTotales();
          this.ctaCteUnificadaService.setObligaciones(this.obligacionesObj);
          this.ctaCteUnificadaService.setTabs(this.tabs);
          this.ctaCteUnificadaService.setDeudasSelected(this.deudasSelected);
          setTimeout(() => {}, 100);
          this.activeTab = this.tabs[0];
          this.submitted = false;
          this.loading = false;
          this.finalizaCarga.emit(true);
          this.blockVisualizarDatos.stop();
          this.startScript();
        }, error => {
          this.loading = false;
          this.submitted = false;
          this.blockVisualizarDatos.stop();
        });
    }
  }

  ngAfterViewInit() {
    console.log('afterViewInit');
    this.startScript();
  }

  onRowSelect(event, obligacionId) {
    this.recalcularTotales();
  }
  onRowUnselect(event, obligacionId) {
    this.recalcularTotales();
  }
  onSelectUnselectAll(event, obligacionId) {
    this.recalcularTotales();
  }

  onSelectUnselectAllGeneral(checked) {
    for (let imponible in this.obligacionesObj) {
      for (let obl of this.obligacionesObj[imponible]) {
        const obligacionId = obl['id'];
        if (checked) {
          this.deudasSelected[obligacionId] = obl.detalles.filter((det) => {
            return det.estado === 'Impago';
          });
        } else {
          this.deudasSelected[obligacionId] = [];
        }
      }
    }
    this.recalcularTotales();
  }

  recalcularTotales() {
    let totalGeneral = 0;
    let totalImponible = 0;
    for (let imponible in this.obligacionesObj) {
      for (let obl of this.obligacionesObj[imponible]) {
        const total = this.deudasSelected[obl['id']] && this.deudasSelected[obl['id']].length > 0 ? this.deudasSelected[obl['id']].reduce((totalAnt, totalNuevo) => {
          return totalAnt + totalNuevo.importeActualizado;
        }, 0) : 0.00;
        obl['total'] = total.toFixed(2);
        totalImponible += total;
        totalGeneral += total;
      }
      this.totalImponible[imponible] = totalImponible.toFixed(2);
      totalImponible = 0;
    }
    this.totalPagar = totalGeneral.toFixed(2);
  }

  tienePeriodosConDeuda(detalles: []) {
    return detalles.some((d: any) => (d.estado === 'No Vencida' || d.estado === 'Impago' || d.estado === 'Cuota Anual'))
  }

  strip_tags(text, tags) {
    return text.replace(new RegExp("<(?!/?(" + tags.join('|') + "))\\w*[^<>]*>", "gi"), '')
      .replace(new RegExp("(<" + tags.join('|') + ")[^<>]*", "gi"), "$1");
  }


  ngOnDestroy(): void {
    if (this.consultaObligacionesSubscription) {
      this.consultaObligacionesSubscription.unsubscribe();
    }
    if (this.generarDetallesVtosSubscription) {
      this.generarDetallesVtosSubscription.unsubscribe();
    }
    if (this.imprimirSubscription) {
      this.imprimirSubscription.unsubscribe();
    }
    if (this.detallesSubscription) {
      this.detallesSubscription.unsubscribe();
    }
  }

  private cargarCalendars() {
    $('#fechaPago').bootstrapMaterialDatePicker(this.datepickerOptions).on('change', (e, date) => {
      this.form.get('fechaPago').setValue(moment(date).format('DD/MM/YYYY'));
    });
    $('#fechaPago').bootstrapMaterialDatePicker('setMinDate', new Date());
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.refreshData && changes.refreshData.currentValue === false) {
      this.refreshData = false;
      this.obligacionesObj = this.ctaCteUnificadaService.getObligaciones();
      this.tabs = this.ctaCteUnificadaService.getTabs();
      this.deudasSelected = this.ctaCteUnificadaService.getDeudasSelected();
      this.recalcularTotales();
      this.activeTab = this.ctaCteUnificadaService.getActiveTab();
      this.loading = false;
      this.startScript();
    }
    if (changes.tituloPagina && !changes.tituloPagina.firstChange) {
      this.form.get('fechaPago').setValue(moment().format('DD/MM/YYYY'));
      this.consultarObligaciones();
    }
  }

  obtenerDetalle(detalle) {
    console.log(detalle);
    const body = {
      tipoImponible: detalle.tipoImponible,
      claveImponible: detalle.claveImponible,
      impuesto: detalle.impuesto,
      conceptoObligacion: detalle.conceptoObligacion,
      numeroObligacionImpuesto: detalle.noi,
      numeroCuota: detalle.numCuota,
      anioCuota: detalle.anio,
      numeroRectificativa: detalle.numRectif
    };
    this.detallesSubscription = this.ctaCteUnificadaService.obtenerDetalleCtaCte(body)
      .subscribe((response) => {
        const stripTable = this.strip_tags(response.result, ['tr', 'thead', 'th', 'td']);
        console.log(stripTable);
        this.detalleDeuda = stripTable;
        $(this.tablaDetalleDeudaEl.nativeElement).modal('show');
        console.log(response);
      })
  }

  closeModalInfo() {
    this.detalleDeuda = undefined;
    $(this.tablaDetalleDeudaEl.nativeElement).modal('hide');
  }

}
