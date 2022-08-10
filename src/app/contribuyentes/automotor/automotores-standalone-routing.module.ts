import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ImpuestoAutomotorComponent} from './emision-boletas/impuesto-automotor/impuesto-automotor.component';
import {TasaAmbientalComponent} from './emision-boletas/tasa-ambiental/tasa-ambiental.component';
import {MultasTransitoComponent} from './emision-boletas/multas-transito/multas-transito.component';

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
  },{
    path: 'multas-transito',
    component: MultasTransitoComponent
  }]
}];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AutomotoresStandaloneRoutingModule {
}
