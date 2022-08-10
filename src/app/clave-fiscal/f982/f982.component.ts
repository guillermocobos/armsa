import {Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { v1 as uuidv1 } from 'uuid';

import * as FileSaver from 'file-saver';
import {F982Service} from "./f982.service";
import {DynamicScriptLoaderService} from "../../dynamic-script-loader-service.service";
import {AuthenticationService} from "../../authentication/signin/authentication.service";


declare const $: any;
declare const DataTables: any;

export const INMOBILIARIO = {
  id: 1,
  titulo: 'Inmobiliario',
  impuesto: '0007',
  concepto: '0006'
};
export const TGI = {
  id: 2,
  titulo: 'Tasa General de Inmuebles',
  impuesto: '0008',
  concepto: '0006'
};
export const TPA = {
  id: 3,
  titulo: 'Tasa de Protección Ambiental',
  impuesto: '0042',
  concepto: '0006'
};
export const AUTOMOTOR = {
  id: 4,
  titulo: 'Automotor',
  impuesto: '0006',
  concepto: '0006'
};

@Component({
  selector: 'app-f982',
  templateUrl: './f982.component.html'
})
export class F982Component implements OnInit {

  generarDetallesVtosSubscription: Subscription;
  fechaPago;
  totalPagar;
  secuencia;
  loadingGenerarDetalle = false;
  errorGeneral;
  mostrarCtaCte = false;
  activeButton: any = {
    id: 0
  };
  inmobiliario = INMOBILIARIO;
  tgi = TGI;
  tpa = TPA;
  automotor = AUTOMOTOR;
  loadingButton = false;

  @BlockUI('visualizar-datos') blockVisualizarDatos: NgBlockUI;

  constructor(
    private ctaCteUnificadaService: F982Service,
    private authService: AuthenticationService,
    private fb: FormBuilder,
    private dynamicScriptLoader: DynamicScriptLoaderService
  ) {
    moment.locale('es');
  }

  ngOnInit() {

  }

  seleccionarImpuesto(impuesto) {
    if (!this.loadingButton) {
      this.mostrarCtaCte = true;
      this.activeButton = impuesto;
      this.loadingButton = true;
    }
  }

  onFinalizaCarga() {
    this.loadingButton = false;
  }

  generarDetallesVencimientos(deuda) {
    this.totalPagar = deuda.totalPagar;
    this.fechaPago = deuda.fechaPago;
    this.secuencia = undefined;
    this.loadingGenerarDetalle = true;
    let detalles = [];
    const deudas: any = Object.values(deuda.deudasSelected);
    for (let deuda of deudas) {
      if (deuda.length > 0) {
        detalles = detalles.concat(deuda);
      }
    }

    const body = {
      fechaPago: deuda.fechaPago,
      detalles: detalles
    };
    this.generarDetallesVtosSubscription = this.ctaCteUnificadaService.generarObligacionesDetalles(body)
      .subscribe((response) => {
        console.log(response);
        const blob = new Blob([response], {
          type: 'application/pdf'
        });
        FileSaver.saveAs(blob, `F982.pdf`);
          this.loadingGenerarDetalle = false;
          // this.secuencia = response.secuencia;

      }, (error) => {
        this.errorGeneral = 'Hubo un error al procesar su solicitud.'
        this.loadingGenerarDetalle = false;
      });
  }

}
