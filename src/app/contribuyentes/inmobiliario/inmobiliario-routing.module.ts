import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ImpuestoInmobiliarioComponent} from "./emision-boletas/impuesto-inmobiliario/impuesto-inmobiliario.component";
import {TgiComponent} from "./emision-boletas/tgi/tgi.component";
import {PlanesPagoComponent} from '../inmobiliario/emision-boletas/planes-pago/planes-pago.component';
import {ImpuestoInmobiliarioComponent as ImpuestoInmobiliarioEstadoDeudaComponent} from "../inmobiliario/estado-deuda/impuesto-inmobiliario/impuesto-inmobiliario.component";
import {TgiComponent as TgiComponentEstadoDeudaComponent} from "../inmobiliario/estado-deuda/tgi/tgi.component";
import {PlanesPagoComponent as PlanesPagoEstadoDeudaComponent} from "../inmobiliario/estado-deuda/planes-pago/planes-pago.component";

const routes: Routes = [{
  path: '',
  redirectTo: 'emision-boletas/impuesto-inmobiliario',
  pathMatch: 'full',
}, {
  path: 'emision-boletas',
  children: [{
    path: '',
    redirectTo: 'impuesto-inmobiliario',
    pathMatch: 'full',
  }, {
    path: 'impuesto-inmobiliario',
    component: ImpuestoInmobiliarioComponent
  }, {
    path: 'tgi',
    component: TgiComponent
  }, {
    path: 'planes-pago',
    component: PlanesPagoComponent
  }]
}, {
  path: 'estado-deuda',
  children: [{
    path: '',
    redirectTo: 'impuesto-inmobiliario',
    pathMatch: 'full',
  }, {
    path: 'impuesto-inmobiliario',
    component: ImpuestoInmobiliarioEstadoDeudaComponent
  }, {
    path: 'tgi',
    component: TgiComponentEstadoDeudaComponent
  }, {
    path: 'planes-pago',
    component: PlanesPagoEstadoDeudaComponent
  }]
}];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InmobiliarioRoutingModule {
}
