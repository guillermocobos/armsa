import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ImpuestoInmobiliarioComponent} from "./emision-boletas/impuesto-inmobiliario/impuesto-inmobiliario.component";
import {TgiComponent} from "./emision-boletas/tgi/tgi.component";

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
  }]
}];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InmobiliarioStandaloneRoutingModule {
}
