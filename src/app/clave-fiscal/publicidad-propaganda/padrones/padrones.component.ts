import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { Validators } from '@angular/forms';
import { AuthenticationService } from '../../../authentication/signin/authentication.service';
import { ClaveFiscalService } from '../../clave-fiscal.service';
import { PadronPyPModel } from '../../../models/padron-pyp.model';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { CabeceraPypModel } from '../../../models/cabecera-pyp.model';
import {PublicidadPropagandaService} from "../publicidad-propaganda.service";

@Component({
  selector: 'app-padrones',
  templateUrl: './padrones.component.html'
})
export class PadronesComponent implements OnInit, OnDestroy {
  contribuyente;
  loading = false;

  mostrarCargaDDJJCarteles = false;
  mostrarCargaDDJJVehiculos = false;
  mostrarPadrones = true;
  padronSelected;

  dtOptions: DataTables.Settings = {
    pageLength: 10,
    pagingType: 'first_last_numbers',
    language: {
      url: '//cdn.datatables.net/plug-ins/1.10.19/i18n/Spanish.json'
    },
    columns: [
      null,
      {orderable: false},
      {orderable: false}
    ],
    order: [[ 0, 'asc']]
  };
  dtTrigger: Subject<any>;
  padrones = [];
  pendientes = [];
  padronesSubscription: Subscription;

  @ViewChild('tablaPadrones', {static: false}) tablaPadrones: ElementRef;
  @BlockUI('visualizar-datos') blockVisualizarDatos: NgBlockUI;

  constructor(
    private authService: AuthenticationService,
    private publicidadPropagandaService: PublicidadPropagandaService
  ) {}

  ngOnInit() {
    this.contribuyente = this.authService.getContribuyenteSesion();
    this.consultarPadrones();
  }

  consultarPadrones() {
    this.loading = true;
    this.blockVisualizarDatos.start();
    const personaId = this.authService.getSessionUserId();
    const body = {
      numeroInscripcion: personaId
    };
    this.dtTrigger = new Subject();
    this.padronesSubscription = this.publicidadPropagandaService.consultaTributosConceptos()
      .subscribe((data: any) => {
        console.log(data);
        this.padrones = data;
        this.loading = false;
        setTimeout(() => {
          this.dtTrigger.next();
        }, 100);
        this.blockVisualizarDatos.stop();
      }, (err) => {
        console.error(err);
      });
  }

  cargarDDJJCarteles(padron) {
    this.mostrarCargaDDJJCarteles = true;
    this.mostrarCargaDDJJVehiculos = false;
    this.mostrarPadrones = false;
    this.padronSelected = padron;
  }

  cargarDDJJVehiculos(padron) {
    this.mostrarCargaDDJJVehiculos = true;
    this.mostrarCargaDDJJCarteles = false;
    this.mostrarPadrones = false;
    this.padronSelected = padron;
  }

  ngOnDestroy(): void {
    if (this.padronesSubscription) {
      this.padronesSubscription.unsubscribe();
    }
  }

  volverPadrones () {
    this.mostrarCargaDDJJVehiculos = false;
    this.mostrarCargaDDJJCarteles = false;
    this.mostrarPadrones = true;
    this.consultarPadrones();
  }

}
