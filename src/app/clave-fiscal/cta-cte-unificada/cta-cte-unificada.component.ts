import {Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
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

@Component({
  selector: 'app-cta-cte-unificada',
  templateUrl: './cta-cte-unificada.component.html'
})
export class CtaCteUnificadaComponent implements OnInit {

  generarDetallesVtosSubscription: Subscription;
  fechaPago;
  totalPagar;
  secuencia;
  loadingGenerarDetalle = false;
  errorGeneral;

  @BlockUI('visualizar-datos') blockVisualizarDatos: NgBlockUI;

  constructor(
    private ctaCteUnificadaService: CtaCteUnificadaService,
    private authService: AuthenticationService,
    private fb: FormBuilder,
    private dynamicScriptLoader: DynamicScriptLoaderService
  ) {
    moment.locale('es');
  }

  ngOnInit() {

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
