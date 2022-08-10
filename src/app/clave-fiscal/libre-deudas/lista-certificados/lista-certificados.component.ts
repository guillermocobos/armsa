import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AuthenticationService } from '../../../authentication/signin/authentication.service';
import { ClaveFiscalService } from '../../clave-fiscal.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import * as moment from "moment";
import * as FileSaver from "file-saver";
import {LibreDeudasService} from "../libre-deudas.service";

declare const $: any;

@Component({
  selector: 'app-lista-certificados-libre-deudas',
  templateUrl: './lista-certificados.component.html',
  styles: [`
    #tabla-certificados span{
      display:none;
    }
  `]
})
export class ListaCertificadosComponent implements OnInit, OnDestroy {
  contribuyente;
  personaId;
  loading = false;
  loadingImprimir = false;
  certificadoImprimir;
  indexImprimir;

  fechaHoy = moment().format('DD/MM/YYYY');
  certificados = [];

  dtOptions: DataTables.Settings = {
    pageLength: 10,
    pagingType: 'first_last_numbers',
    language: {
      url: '//cdn.datatables.net/plug-ins/1.10.19/i18n/Spanish.json'
    },
    columnDefs: [
      { orderable: false, targets: [6] }
    ],
    order: [[ 0, 'desc']]
  };
  dtTrigger: Subject<any>;
  certificadosTributariasSubscription: Subscription;
  imprimirSubscription: Subscription;


  @BlockUI('visualizar-datos') blockVisualizarDatos: NgBlockUI;
  @ViewChild('modificarInstalacionModal', {static: true}) modificarInstalacionModal: ElementRef;

  constructor(
    private authService: AuthenticationService,
    private claveFiscalService: ClaveFiscalService,
    private fb: FormBuilder,
    private libreDeudasService: LibreDeudasService
  ) {}

  ngOnInit() {
    this.personaId = this.authService.getSessionUserId();
    this.contribuyente = this.authService.getContribuyenteSesion();
    this.listarCertificados();
  }

  listarCertificados() {
    this.loading = true;
    this.blockVisualizarDatos.start();
    this.certificados = [];

    this.dtTrigger = new Subject();
    this.certificadosTributariasSubscription = this.libreDeudasService.listarCertificados()
      .subscribe((data: any) => {
        console.log(data);
        this.certificados = data;
        this.loading = false;
        setTimeout(() => {
          this.dtTrigger.next();
        }, 100);
        this.blockVisualizarDatos.stop();
      }, (err) => {
        console.error(err);
      });
  }


  imprimir(certificado, index) {
    this.certificadoImprimir = certificado;
    this.indexImprimir = index;
    this.loadingImprimir = true;
    const body = {
      certificadoId: certificado.certificadoId,
      tipoCertificado: certificado.tipoCertificado,
      tipoImponible: certificado.tipoImponible
    };
    this.imprimirSubscription = this.libreDeudasService.imprimirCertificado(body)
      .subscribe((response: any) => {
        this.loadingImprimir = false;
        const blob = new Blob([response], {
          type: 'application/pdf'
        });
        FileSaver.saveAs(blob, `certificado_${certificado.tipoCertificado}_${certificado.certificadoId}.pdf`);
        this.certificadoImprimir = undefined;
        this.indexImprimir = undefined;
      }, (error) => {
        this.certificadoImprimir = undefined;
        this.indexImprimir = undefined;
        this.loadingImprimir = false;
    });
  }


  ngOnDestroy(): void {
    if (this.certificadosTributariasSubscription) {
      this.certificadosTributariasSubscription.unsubscribe();
    }
    if (this.imprimirSubscription) {
      this.imprimirSubscription.unsubscribe();
    }
  }

}
