import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConsultaCuentaUnicaComponent } from './consulta-cuenta-unica/consulta-cuenta-unica.component';
import { DatosInscripcionComponent } from './consulta-cuenta-unica/datos-inscripcion.component';
import { DatosContribuyenteComponent } from './datos-contribuyente/datos-contribuyente.component';
import { DeclaracionesJuradasComponent } from './declaraciones-juradas/declaraciones-juradas.component';
import { PresentacionDDJJComponent } from './declaraciones-juradas/presentacion-ddjj.component';
import { MenuPrincipalComponent } from './menu-principal/menu-principal.component';
import { PublicidadPropagandaComponent } from './publicidad-propaganda/publicidad-propaganda.component';
import { PadronesComponent } from './publicidad-propaganda/padrones/padrones.component';
import { RetencionesPercepcionesMenuComponent } from './retenciones-percepciones/retenciones-percepciones-menu.component'

const routes: Routes = [{
  path: '',
  redirectTo: 'inicio',
  pathMatch: 'full'
}, {
  path: 'inicio',
  component: MenuPrincipalComponent
}, {
  path: 'datos-contribuyente',
  component: DatosContribuyenteComponent
}, {
  path: 'declaraciones-juradas/presentacion',
  component: PresentacionDDJJComponent
}, {
  path: 'declaraciones-juradas/consulta',
  component: DeclaracionesJuradasComponent
}, {
  path: 'publicidad-propaganda/carteles',
  component: PadronesComponent
}, {
  path: 'publicidad-propaganda',
  component: PublicidadPropagandaComponent
}, {
  path: 'consulta-cuenta-unica/datos-inscripcion/:tipoImponible/:claveImponible',
  component: DatosInscripcionComponent
}, {
  path: 'consulta-cuenta-unica/datos-inscripcion/estado-deuda',
  component: DatosInscripcionComponent
}, {
  path: 'consulta-cuenta-unica',
  component: ConsultaCuentaUnicaComponent
}, {
  path: 'estructuras-antenas',
  loadChildren: () => import('./estructuras-antenas/estructuras-antenas.module').then(m => m.EstructurasAntenasModule)
}, {
  path: 'boton-pago',
  loadChildren: () => import('./boton-pago/boton-pago.module').then(m => m.BotonPagoModule)
}, {
  path: 'cuenta-corriente-unificada',
  loadChildren: () => import('./cta-cte-unificada/cta-cte-unificada.module').then(m => m.CtaCteUnificadaModule)
}, {
  path: 'f982',
  loadChildren: () => import('./f982/f982.module').then(m => m.F982Module)
}, {
  path: 'libre-deudas',
  loadChildren: () => import('./libre-deudas/libre-deudas.module').then(m => m.LibreDeudasModule)
}, {
  path: 'retenciones-percepciones',
  loadChildren: () => import('./retenciones-percepciones/retenciones-percepciones.module').then(m => m.RetencionesPercepcionesModule)
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClaveFiscalRoutingModule {
}
