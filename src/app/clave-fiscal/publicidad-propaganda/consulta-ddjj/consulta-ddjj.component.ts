import {ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AuthenticationService } from '../../../authentication/signin/authentication.service';
import { ClaveFiscalService } from '../../clave-fiscal.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import * as moment from "moment";
import * as FileSaver from "file-saver";
import cuitValidator from "../../../shared/helpers/validators/cuit-validator";
import {PublicidadPropagandaService} from "../publicidad-propaganda.service";

declare const $: any;

@Component({
  selector: 'app-consulta-ddjj-pyp',
  templateUrl: './consulta-ddjj.component.html',
  styles: [`
    #tabla-ddjjs span{
      display:none;
    }
  `]
})
export class ConsultaDdjjComponent implements OnInit, OnDestroy {
  contribuyente;
  personaId;
  loading = false;
  loadingDetalles = false;
  formEliminar: FormGroup;
  formAgregarEstructura: FormGroup;

  dtOptions: DataTables.Settings = {
    pageLength: 20,
    pagingType: 'first_last_numbers',
    language: {
      url: '//cdn.datatables.net/plug-ins/1.10.19/i18n/Spanish.json'
    },
    columnDefs: [
      { orderable: false, targets: 0 }
    ],
    order: [[ 3, 'desc']]
  };

  dtOptionsDetalles: DataTables.Settings = {
    pageLength: 20,
    pagingType: 'first_last_numbers',
    language: {
      url: '//cdn.datatables.net/plug-ins/1.10.19/i18n/Spanish.json'
    },
    order: [[ 0, 'asc']]
  };
  dtTrigger: Subject<any>;
  dtTriggerDetalles: Subject<any>;
  ddjjs = [];
  detalles = [];
  ddjjsSubscription: Subscription;
  ddjjDetallesSubscription: Subscription;
  imprimirSubscription: Subscription;

  mostrarOPEConsolidadas = true;
  mostrarDetallesOPEConsolidadas = false;
  loadingImprimir = false;
  ddjjSeleccionada;

  @BlockUI('visualizar-datos') blockVisualizarDatos: NgBlockUI;
  @BlockUI('visualizar-datos-detalles') blockVisualizarDatosDetalles: NgBlockUI;
  @ViewChild('confirmacionModal', {static: true}) confirmacionModal: ElementRef;


  constructor(
    private authService: AuthenticationService,
    private claveFiscalService: ClaveFiscalService,
    private fb: FormBuilder,
    private publicidadPropagandaService: PublicidadPropagandaService,
    private cdr : ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.personaId = this.authService.getSessionUserId();
    this.contribuyente = this.authService.getContribuyenteSesion();
    this.consultarOPEConsolidadas();
  }

  get fe() {
    return this.formEliminar.controls;
  }
  get fa() {
    return this.formAgregarEstructura.controls;
  }

  consultarOPEConsolidadas() {
    this.loading = true;
    setTimeout(() => {
      this.blockVisualizarDatos.start()
    }, 1);
    this.ddjjs = [];
    this.detalles = [];

    this.dtTrigger = new Subject();
    this.ddjjsSubscription = this.publicidadPropagandaService.obtenerOPEConsolidadas()
      .subscribe((data: any) => {
        this.ddjjs = data;
        this.loading = false;
        setTimeout(() => {
          this.dtTrigger.next();
        }, 100);
        setTimeout(() => {
          this.blockVisualizarDatos.stop();
        }, 1);
      }, (err) => {
        this.loading = false;
        setTimeout(() => {
          this.blockVisualizarDatos.stop();
        }, 1);
        console.error(err);
      });
  }

  consultarDetalleOPEConsolidadas(ddjj) {
    this.ddjjSeleccionada = ddjj;
    this.mostrarOPEConsolidadas = false;
    this.mostrarDetallesOPEConsolidadas = true;
    this.loadingDetalles = true;
    setTimeout(() => {
      this.blockVisualizarDatosDetalles.start();
    }, 1);
    this.detalles = [];

    this.dtTriggerDetalles = new Subject();
    this.ddjjDetallesSubscription = this.publicidadPropagandaService.obtenerDetalleOPEConsolidadas(ddjj.numeroOpe)
      .subscribe((data: any) => {
        this.detalles = data;
        this.loadingDetalles = false;
        setTimeout(() => {
          this.dtTriggerDetalles.next();
        }, 100);
        setTimeout(() => {
          this.blockVisualizarDatosDetalles.stop();
        }, 1);
      }, (err) => {
        this.loading = false;
        setTimeout(() => {
          this.blockVisualizarDatosDetalles.stop();
        }, 1);
        console.error(err);
      });
  }

  volver() {
    this.ddjjSeleccionada = undefined;
    this.mostrarDetallesOPEConsolidadas = false;
    this.mostrarOPEConsolidadas = true;
    this.consultarOPEConsolidadas();
  }

  imprimirConstanciaProvisoria() {
    this.loadingImprimir = true;
    const body = {
      numeroOPE: this.ddjjSeleccionada.numeroOpe,
    };
    this.imprimirSubscription = this.publicidadPropagandaService.imprimirConstanciaProvisoriaOPE(body)
      .subscribe((response: any) => {
        const blob = new Blob([response], {
          type: 'application/pdf'
        });
        FileSaver.saveAs(blob, `ConstanciaProvisoriaOPE_${this.ddjjSeleccionada.numeroOpe}.pdf`);
        this.loadingImprimir = false;
      }, (error) => {
        this.loadingImprimir = false;
      });
  }

  ngOnDestroy(): void {
    if (this.ddjjsSubscription) {
      this.ddjjsSubscription.unsubscribe();
    }
    if (this.ddjjDetallesSubscription) {
      this.ddjjDetallesSubscription.unsubscribe();
    }
    if (this.imprimirSubscription) {
      this.imprimirSubscription.unsubscribe();
    }
  }

}
