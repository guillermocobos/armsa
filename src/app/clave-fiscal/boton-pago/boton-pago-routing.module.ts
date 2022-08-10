import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuOpemComponent } from './opem/menu-opem.component';
import { BotonPagoMenuComponent } from './boton-pago-menu.component';
import { GeneracionOpemComponent } from './opem/generacion-opem.component';
import { PagoTarjetaComponent } from './pago-tarjeta/pago-tarjeta.component';
import { ConsultaPagosElectronicosComponent } from './central-pagos/consulta-pagos-electronicos/consulta-pagos-electronicos.component';

const routes: Routes = [{
  path: '',
  component: BotonPagoMenuComponent,
  pathMatch: 'full'
}, {
  path: 'opem/generacion-opem',
  component: GeneracionOpemComponent
}, {
  path: 'opem',
  component: MenuOpemComponent
}, {
  path: 'tarjetas-credito-online',
  component: PagoTarjetaComponent
}, {
  path: 'central-pagos',
  loadChildren: () => import('./central-pagos/central-pagos.module').then(m => m.CentralPagosModule)
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BotonPagoRoutingModule { }
