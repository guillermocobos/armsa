import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EstructurasAntenasMenuComponent } from './estructuras-antenas-menu.component';
import {CtaCteUnificadaModule} from "../cta-cte-unificada/cta-cte-unificada.module";
import {EstructurasSoporteComponent} from "./estructuras/estructuras-soporte.component";
import {TasaInspeccionComponent} from "./tasa-inspeccion/tasa-inspeccion.component";
import {CuentaTributariaComponent} from "./cuenta-tributaria/cuenta-tributaria.component";

const routes: Routes = [{
  path: '',
  component: EstructurasAntenasMenuComponent,
  pathMatch: 'full'
}, {
  path: 'estructuras',
  component: EstructurasSoporteComponent
}, {
  path: 'tasa-inspeccion',
  component: TasaInspeccionComponent
}, {
  path: 'cuenta-tributaria',
  component: CuentaTributariaComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EstructurasAntenasRoutingModule { }
