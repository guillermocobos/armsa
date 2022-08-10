import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ActividadInscriptaModel } from '../../models/actividad-inscripta.model';
import { ImpuestoInscriptoModel } from '../../models/impuesto-inscripto.model';
import { ClaveFiscalService } from '../clave-fiscal.service';

@Component({
  selector: 'app-datos-inscripcion',
  templateUrl: './datos-inscripcion.component.html'
})
export class DatosInscripcionComponent implements OnInit, OnDestroy, OnChanges {

  paramsSubscription: Subscription;
  actividadesSubscription: Subscription;
  actividad: any;
  actividadesInscriptas: ActividadInscriptaModel[];
  impuestosInscriptos: ImpuestoInscriptoModel[];
  ready = false;

  @Input() tipoImponible;
  @Input() claveImponible;
  @Output() datosCargados = new EventEmitter();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private claveFiscalService: ClaveFiscalService) {}

  ngOnInit() {
    // this.consultarDatos();
  }

  consultarDatos() {
    this.ready = false;
    const actividadesEconomicasPromise = this.claveFiscalService.consultaDatosActividadesEconomicas(this.tipoImponible, this.claveImponible)
      .then((datos) => {
        this.actividad = datos;
      });
    const actividadesInscriptasPromise = this.claveFiscalService.consultaActividadesInscriptas(this.tipoImponible, this.claveImponible)
      .then((actividadesInscriptas: ActividadInscriptaModel[]) => {
        this.actividadesInscriptas = actividadesInscriptas;
      });
    const impuestosInscriptosPromise = this.claveFiscalService.consultaImpuestosInscriptos(this.tipoImponible, this.claveImponible)
      .then((impuestosInscriptos: ImpuestoInscriptoModel[]) => {
        this.impuestosInscriptos = impuestosInscriptos;
      });
    Promise.all([actividadesEconomicasPromise, actividadesInscriptasPromise, impuestosInscriptosPromise])
      .then(() => {
        this.ready = true;
        this.datosCargados.emit(true);
      });
  }

  ngOnDestroy() {
    if (this.paramsSubscription) {
      this.paramsSubscription.unsubscribe();
    }
    if (this.actividadesSubscription) {
      this.actividadesSubscription.unsubscribe();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    this.consultarDatos();
  }
}
