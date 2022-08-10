import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CtaCteUnificadaComponent} from "./cta-cte-unificada.component";

const routes: Routes = [{
  path: '',
  component: CtaCteUnificadaComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CtaCteUnificadaRoutingModule {
}
