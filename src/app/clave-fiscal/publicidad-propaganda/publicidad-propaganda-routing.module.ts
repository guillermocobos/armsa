import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PublicidadPropagandaComponent } from './publicidad-propaganda.component';
import { PadronesComponent } from './padrones/padrones.component';
import {ConsultaDdjjComponent} from "./consulta-ddjj/consulta-ddjj.component";

const routes: Routes = [{
  path: '',
  component: PublicidadPropagandaComponent,
  pathMatch: 'full'
}, {
  path: 'publicidad-propaganda/padrones',
  component: PadronesComponent
}, {
  path: 'publicidad-propaganda/consulta-ddjj',
  component: ConsultaDdjjComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicidadPropagandaRoutingModule {
}
