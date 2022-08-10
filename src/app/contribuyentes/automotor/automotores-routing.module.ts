import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ImpuestoAutomotorComponent} from './emision-boletas/impuesto-automotor/impuesto-automotor.component';
import {ImpuestoAutomotorComponent as ImpuestoAutomotorEstadoDeudaComponent} from './estado-deuda/impuesto-automotor/impuesto-automotor.component';
import {TasaAmbientalComponent} from './emision-boletas/tasa-ambiental/tasa-ambiental.component';
import {TasaAmbientalComponent as TasaAmbientalEstadoDeudaComponent} from './estado-deuda/tasa-ambiental/tasa-ambiental.component';
import {MultasTransitoComponent} from './emision-boletas/multas-transito/multas-transito.component';
import {HistorialMultasTransitoComponent} from "./emision-boletas/historial-multas-transito/historial-multas-transito.component";
import {PlanesPagoComponent} from "./emision-boletas/planes-pago/planes-pago.component";
import {PlanesPagoComponent as PlanesPagoEstadoDeudaComponent} from "./estado-deuda/planes-pago/planes-pago.component";
import {SolicitudConstanciaDeudaComponent} from "./estado-deuda/solicitud-constancia-deuda/solicitud-constancia-deuda.component";
import {ConsultaConstanciaDeudaComponent} from "./estado-deuda/consulta-constancia-deuda/consulta-constancia-deuda.component";

const routes: Routes = [{
  path: '',
  redirectTo: 'emision-boletas/impuesto-automotor',
  pathMatch: 'full',
}, {
  path: 'emision-boletas',
  children: [{
    path: '',
    redirectTo: 'impuesto-automotor',
    pathMatch: 'full',
  }, {
    path: 'impuesto-automotor',
    component: ImpuestoAutomotorComponent
  }, {
    path: 'tasa-ambiental',
    component: TasaAmbientalComponent
  }, {
    path: 'multas-transito',
    component: MultasTransitoComponent
  }, {
    path: 'historial-multas-transito',
    component: HistorialMultasTransitoComponent
  }, {
    path: 'planes-pago',
    component: PlanesPagoComponent
  }]
}, {
  path: 'estado-deuda',
  children: [{
    path: '',
    redirectTo: 'impuesto-automotor',
    pathMatch: 'full',
  }, {
    path: 'impuesto-automotor',
    component: ImpuestoAutomotorEstadoDeudaComponent
  }, {
    path: 'tasa-ambiental',
    component: TasaAmbientalEstadoDeudaComponent
  }, {
    path: 'planes-pago',
    component: PlanesPagoEstadoDeudaComponent
  }, {
    path: 'solicitud-constancia-deuda-regularizada',
    component: SolicitudConstanciaDeudaComponent
  }, {
    path: 'consulta-constancia-deuda-regularizada',
    component: ConsultaConstanciaDeudaComponent
  }]
}];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AutomotoresRoutingModule {
}
