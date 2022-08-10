import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AuthenticationService } from '../../../authentication/signin/authentication.service';
import { ClaveFiscalService } from '../../clave-fiscal.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import {EstructurasAntenasService} from "../estructuras-antenas.service";
import * as moment from "moment";
import * as FileSaver from "file-saver";
import cuitValidator from "../../../shared/helpers/validators/cuit-validator";

declare const $: any;

@Component({
  selector: 'app-cuenta-tributaria',
  templateUrl: './cuenta-tributaria.component.html'
})
export class CuentaTributariaComponent implements OnInit, OnDestroy {
  contribuyente;
  personaId;
  loading = false;
  loadingImprimir = false;
  cuentaImprimir;
  indexImprimir;

  fechaHoy = moment().format('DD/MM/YYYY');
  cuentas = [];

  dtOptions: DataTables.Settings = {
    pageLength: 10,
    pagingType: 'first_last_numbers',
    language: {
      url: '//cdn.datatables.net/plug-ins/1.10.19/i18n/Spanish.json'
    },
    columnDefs: [
      { orderable: false, targets: [8] }
    ],
    order: [[ 0, 'desc']]
  };
  dtTrigger: Subject<any>;
  cuentasTributariasSubscription: Subscription;
  imprimirSubscription: Subscription;


  @BlockUI('visualizar-datos') blockVisualizarDatos: NgBlockUI;
  @ViewChild('modificarInstalacionModal', {static: true}) modificarInstalacionModal: ElementRef;

  constructor(
    private authService: AuthenticationService,
    private claveFiscalService: ClaveFiscalService,
    private fb: FormBuilder,
    private estructurasAntenasService: EstructurasAntenasService
  ) {}

  ngOnInit() {
    this.personaId = this.authService.getSessionUserId();
    this.contribuyente = this.authService.getContribuyenteSesion();
    this.consultarCuentaTributaria();
  }

  consultarCuentaTributaria() {
    this.loading = true;
    this.blockVisualizarDatos.start();
    this.cuentas = [];

    this.dtTrigger = new Subject();
    this.cuentasTributariasSubscription = this.estructurasAntenasService.obtenerCuentaTributaria()
      .subscribe((data: any) => {
        console.log(data);
        this.cuentas = data;
        this.loading = false;
        setTimeout(() => {
          this.dtTrigger.next();
        }, 100);
        this.blockVisualizarDatos.stop();
      }, (err) => {
        console.error(err);
      });
  }


  modificarModal(instalacion) {
    $(this.modificarInstalacionModal.nativeElement).modal('show');
  }


  imprimir(cuenta, index) {
    this.cuentaImprimir = cuenta;
    this.indexImprimir = index;
    this.loadingImprimir = true;
    const body = {
      estructuraId: cuenta.estructuraId,
      descripcionConcepto: cuenta.descripcionConcepto,
      verificacionId: cuenta.verificacionId
    };
    this.imprimirSubscription = this.estructurasAntenasService.imprimirCuenta(body)
      .subscribe((response: any) => {
        this.loadingImprimir = false;
        const blob = new Blob([response], {
          type: 'application/pdf'
        });
        FileSaver.saveAs(blob, `instalaciones_electricas_${cuenta.descripcionConcepto}_${cuenta.estructuraId}.pdf`);
        this.cuentaImprimir = undefined;
        this.indexImprimir = undefined;
      }, (error) => {
        this.cuentaImprimir = undefined;
        this.indexImprimir = undefined;
        this.loadingImprimir = false;
    });
  }


  ngOnDestroy(): void {
    if (this.cuentasTributariasSubscription) {
      this.cuentasTributariasSubscription.unsubscribe();
    }
    if (this.imprimirSubscription) {
      this.imprimirSubscription.unsubscribe();
    }
  }

}
