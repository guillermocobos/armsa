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
import { BoletaPlanModel } from '../../models/boleta-plan.model';
import { ClaveFiscalService } from '../clave-fiscal.service';
import * as _ from 'lodash';
import * as moment from 'moment';
import * as FileSaver from "file-saver";


declare const $: any;

@Component({
  selector: 'app-boleta-pago-planes',
  templateUrl: './boleta-pago-planes.component.html'
})
export class BoletaPagoPlanesComponent implements OnInit, OnDestroy {

  @Input() planFacilidad;
  @Input() identificacion;
  @Output() datosCargados = new EventEmitter();

  @BlockUI('carga-boletas-pago') blockCargaBoletasPago: NgBlockUI;

  boletasPagoSubscription: Subscription;
  imprimirCtaUnicaSubscription: Subscription;

  formBoletas: FormGroup;
  ready = false;
  boletas: BoletaPlanModel[] = [];
  boletaImprimir;
  loadingImprimir = false;

  constructor(
    private claveFiscalService: ClaveFiscalService,
    private fb: FormBuilder
  ) {
    moment.locale('es');
  }

  ngOnInit() {
    console.log();

    this.formBoletas = this.fb.group({
      cuotaDesde: [1, [Validators.required]],
      cuotaHasta: [48, [Validators.required]],
    }, {updateOn: 'blur'});
    this.mostrarBoletasPago();
  }

  mostrarBoletasPago() {
    this.ready = false;
    this.boletas = [];
    this.blockCargaBoletasPago.start();
    const body = {
      planFacilidad: this.planFacilidad,
      cuotaDesde: this.formBoletas.get('cuotaDesde').value,
      cuotaHasta: this.formBoletas.get('cuotaHasta').value
    };
    this.boletasPagoSubscription = this.claveFiscalService.consultaBoletasPagoPlanes(body)
      .subscribe((boletasPago: BoletaPlanModel[]) => {
        this.boletas = boletasPago; //Incid109245
        console.log("ARMSA-FRONT-- this.boletas= "+this.boletas);//borrar
        this.datosCargados.emit(true);
        this.blockCargaBoletasPago.stop();
        this.ready = true;
      });
  }

  consultarPeriodo() {
    this.mostrarBoletasPago();
  }

  // Jsilva, Incidente 109245 
  imprimir(boleta) {
    console.log("ARMSA-FRONT--entró a imprimir(boleta)");//borrar
    this.loadingImprimir = true;
    this.boletaImprimir = boleta;
    let form = 'F981';
    const reportData = {
      boleta,
      formulario: form
    };
    this.imprimirCtaUnicaSubscription = this.claveFiscalService.imprimirBoletaCtaUnicaPlanes(reportData)
      .subscribe((reporte) => {
        this.loadingImprimir = false;
        const blob = new Blob([reporte], {
          type: 'application/pdf'
        });
        FileSaver.saveAs(blob, `boleta_pago.pdf`);
      });
  }
  //Fin Jsilva, Incidente 109245 

  ngOnDestroy() {
    if (this.boletasPagoSubscription) {
      this.boletasPagoSubscription.unsubscribe();
    }
  }
}
