import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LibreDeudasMenuComponent} from "./libre-deudas-menu.component";
import {SolicitudLibreDeudasComponent} from "./solicitud-libre-deudas/solicitud-libre-deudas.component";
import {ListaCertificadosComponent} from "./lista-certificados/lista-certificados.component";

const routes: Routes = [{
  path: '',
  component: LibreDeudasMenuComponent,
  pathMatch: 'full'
}, {
  path: 'nueva-solicitud',
  component: SolicitudLibreDeudasComponent
}, {
  path: 'lista-certificados',
  component: ListaCertificadosComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LibreDeudasRoutingModule { }
