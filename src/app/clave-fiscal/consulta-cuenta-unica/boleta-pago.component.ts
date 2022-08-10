import {
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
import { BoletaInscripcionModel } from '../../models/boleta-inscripcion.model';
import { ClaveFiscalService } from '../clave-fiscal.service';
import * as _ from 'lodash';
import * as moment from 'moment';
import {AuthenticationService} from "../../authentication/signin/authentication.service";
import * as FileSaver from "file-saver";


declare const $: any;

@Component({
  selector: 'app-boleta-pago',
  templateUrl: './boleta-pago.component.html'
})
export class BoletaPagoComponent implements OnInit, OnDestroy {

  @Input() tipoImponible;
  @Input() claveImponible;
  @Input() impuesto;
  @Output() datosCargados = new EventEmitter();

  @ViewChild('mesAnioDesde', {static: true}) mesAnioDesdeEl: ElementRef;
  @ViewChild('mesAnioHasta', {static: true}) mesAnioHastaEl: ElementRef;
  @ViewChild('fechaPago', {static: true}) fechaPagoEl: ElementRef; //JSilva, Punto 8
  @ViewChild('modalMensaje', {static: false}) modalMensajeEl: ElementRef;

  @BlockUI('carga-boletas-pago') blockCargaBoletasPago: NgBlockUI;

  boletasPagoSubscription: Subscription;
  deudaTishhSubscription: Subscription;
  imprimirSubscription: Subscription;
  imprimirCtaUnicaSubscription: Subscription;

  formBoletas: FormGroup;
  ready = false;
  boletas = [];
  formularios = ['F975', 'F2001', 'F980/B', 'F980/C', 'F981/B', 'F985', 'F986', 'F988', 'F976', 'F981', 'Formulario F980'];
  mensajeModal;
  loadingImprimir = false;
  boletaImprimir;

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

  //JSilva, Punto 8
  dayMonthYearPickerOptions = {
    minViewMode: 2,
    startView: 2,
    minView: 2,
    format: 'dd-mm-yyyy',
    language: 'es',
    autoclose: true,
    bootcssVer: 4,
    startDate: new Date()
  };
  //Fin JSilva, Punto 8


  constructor(
    private claveFiscalService: ClaveFiscalService,
    private fb: FormBuilder,
    private authService: AuthenticationService
  ) {
    moment.locale('es');
  }

  ngOnInit() {
    this.formBoletas = this.fb.group({
      mesAnioDesde: [moment().format('MM-YYYY'), [Validators.required]],
      mesAnioHasta: [moment().format('MM-YYYY'), [Validators.required]],
      fechaPago: [moment().format('DD-MM-YYYY'), [Validators.required]], //JSilva, Punto 8
    }, {updateOn: 'blur'});
    this.cargarCalendars();
    this.mostrarBoletasPago();
  }

  mostrarBoletasPago() {
    this.ready = false;
    this.boletas = [];
    this.blockCargaBoletasPago.start();
    const body = {
      tipoImponible: this.tipoImponible,
      claveImponible: this.claveImponible,
      codigoImpuesto: this.impuesto,
      periodoDesde: this.formBoletas.get('mesAnioDesde').value,
      periodoHasta: this.formBoletas.get('mesAnioHasta').value,
      fechaPago: this.formBoletas.get('fechaPago').value //JSilva, punto 8
    };
    this.boletasPagoSubscription = this.claveFiscalService.consultaBoletasPago(body)
      .subscribe((boletasPago: BoletaInscripcionModel[]) => {
        let boletasObj: any = {};
        let tituloListado = '';
        for (const boleta of boletasPago) {
          if (boleta.impuesto !== '0017' && boleta.tipoContribuyente !== '0003') {
            if (boleta.presentacion !== tituloListado) {
              if (tituloListado !== '') {
                this.boletas.push(boletasObj);
                boletasObj = {};
              }
              tituloListado = boleta.presentacion;
              boletasObj.titulo = boleta.presentacion;
              boletasObj.boletas = [boleta];
            } else {
              boletasObj.boletas.push(boleta);
            }
          }
        }
        if (!_.isEmpty(boletasObj)) {
          this.boletas.push(boletasObj);
        }
        console.log(boletasObj);
        this.datosCargados.emit(true);
        this.blockCargaBoletasPago.stop();
        this.ready = true;
      });
  }

  private cargarCalendars() {
    $(this.mesAnioDesdeEl.nativeElement).datetimepicker(this.monthYearPickerOptions, {bootcssVer: 4}).on('change', (event) => {
      this.formBoletas.get('mesAnioDesde').setValue(event.target.value);
    });
    $(this.mesAnioHastaEl.nativeElement).datetimepicker(this.monthYearPickerOptions, {bootcssVer: 4}).on('change', (event) => {
      this.formBoletas.get('mesAnioHasta').setValue(event.target.value);
    });
     //JSilva, Punto 8
     $(this.fechaPagoEl.nativeElement).datetimepicker(this.dayMonthYearPickerOptions, {bootcssVer: 4}).on('change', (event) => {
      this.formBoletas.get('fechaPago').setValue(event.target.value);
    });
     //Fin JSilva, Punto 8

  }

  consultarPeriodo() {
    this.mostrarBoletasPago();
  }

  imprimirTISHH(boleta: BoletaInscripcionModel) {
    this.loadingImprimir = true;
    this.boletaImprimir = boleta;
    // obtener deuda tishh
    const body = {
      claveImponible: this.claveImponible,
      impuesto: boleta.impuesto,
      conceptoObligacion: boleta.conceptoObligacion,
      anio: boleta.anio,
      cuota: boleta.numeroObligacion,
      numeroRectificativa: boleta.numeroRectificativa,
      //fechaPago: moment().format('DD/MM/YYYY') //JSilva, punto 8
      fechaPago: this.formBoletas.get('fechaPago').value //JSilva, punto 8
    };
    this.deudaTishhSubscription = this.claveFiscalService.obtieneDeudaTishh(body)
      .subscribe((deuda: any) => {
        const importe = parseFloat(deuda.totalPagar);
        console.log(deuda);
        if(importe > 0) {
          const contribuyente = this.authService.getContribuyenteSesion();
          // imprimir
          const reportData = {
            impuestoAbr: deuda.impuestoAbr,
            conceptoAbr: deuda.conceptoAbr,
            impuesto: boleta.impuesto,
            concepto: boleta.conceptoObligacion,
            cuota: boleta.numeroObligacion,
            anio: boleta.anio,
            identificacion: boleta.identificacion,
            titular: boleta.nombre,
            cuit: boleta.cuitFormateado,
            dni: contribuyente.nro_documento, //boleta.numeroObligacion se usa en java,
            //fechaVencimiento: boleta.fechaVencimiento,//JSilva, punto 8
            fechaVencimiento: this.formBoletas.get('fechaPago').value, //JSilva, punto 8
            importe: deuda.importeCuota,
            recargo: deuda.recargos,
            totalPagar: deuda.totalPagar,
            leyenda: deuda.leyenda,
            codigoBarra: deuda.codigoBarra
          };

          this.imprimirSubscription = this.claveFiscalService.imprimirBoletaTishh(reportData)
            .subscribe((reporte) => {
              this.loadingImprimir = false;
              this.boletaImprimir = undefined;
              const blob = new Blob([reporte], {
                type: 'application/pdf'
              });
              FileSaver.saveAs(blob, `boleta_pago.pdf`);
            });

        } else {
          this.mensajeModal = 'El período no tiene deuda asociada informada.-';
          $(this.modalMensajeEl.nativeElement).modal('show');
          this.loadingImprimir = false;
          this.boletaImprimir = undefined;
        }
      })

  }

  imprimir(boleta, original: boolean, rectificativa: boolean) {
    this.loadingImprimir = true;
    this.boletaImprimir = boleta;
    let form;
    const formulario = boleta.formularioAUsar;
    if ( formulario != 'Formulario F980' ) {
      if ( formulario.indexOf('/') !== -1 ) {
        form = formulario.substring(0,4) + formulario.substring(formulario.indexOf('/')+1);
      }
      else {
        form = formulario;
      }
    }
    else {
      form = 'F980';
    }
    const reportData = {
      boleta,
      original,
      rectificativa,
      formulario: form
    };
    this.imprimirCtaUnicaSubscription = this.claveFiscalService.imprimirBoletaCtaUnica(reportData)
      .subscribe((reporte) => {
        this.loadingImprimir = false;
        this.boletaImprimir = undefined;
        const blob = new Blob([reporte], {
          type: 'application/pdf'
        });
        FileSaver.saveAs(blob, `boleta_pago.pdf`);
      });
  }


  closeModalInfo() {
    this.mensajeModal = undefined;
    $(this.modalMensajeEl.nativeElement).modal('hide');
  }

  ngOnDestroy() {
    if (this.boletasPagoSubscription) {
      this.boletasPagoSubscription.unsubscribe();
    }
    if (this.deudaTishhSubscription) {
      this.deudaTishhSubscription.unsubscribe();
    }
    if (this.imprimirSubscription) {
      this.imprimirSubscription.unsubscribe();
    }
    if (this.imprimirCtaUnicaSubscription) {
      this.imprimirCtaUnicaSubscription.unsubscribe();
    }
  }
}
