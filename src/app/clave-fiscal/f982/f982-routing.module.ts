import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {F982Component} from "./f982.component";

const routes: Routes = [{
  path: '',
  component: F982Component
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class F982RoutingModule {
}
