import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CentralPagosComponent } from './pagos/central-pagos.component';
import { ConsultaPagosElectronicosComponent } from './consulta-pagos-electronicos/consulta-pagos-electronicos.component';

const routes: Routes = [{
  path: '',
  component: CentralPagosComponent,
  pathMatch: 'full'
}, {
  path: 'consulta-pagos-electronicos',
  component: ConsultaPagosElectronicosComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CentralPagosRoutingModule { }
