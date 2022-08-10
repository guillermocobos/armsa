import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RetencionesPercepcionesMenuComponent } from './retenciones-percepciones-menu.component';
import { ConsultaPadronComponent } from './consultas-padron/consulta-padron/consulta-padron.component';
// import { ListaCertificadosComponent } from './lista-certificados/lista-certificados.component';

const routes: Routes = [{
  path: '',
  component: RetencionesPercepcionesMenuComponent,
  pathMatch: 'full'
} , {
  path: 'consulta-padron',
  component: ConsultaPadronComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RetencionesPercepcionesRoutingModule { }