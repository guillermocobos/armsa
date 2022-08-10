import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CalculoInteresesComponent } from './calculo-intereses/calculo-intereses.component';
import { ConstanciaInscripcionComponent } from './constancia-inscripcion/constancia-inscripcion.component';
import { DescargaSipretComponent } from './descarga-sipret/descarga-sipret.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: ConstanciaInscripcionComponent
  },
  {
    path: 'constancia-inscripcion',
    component: ConstanciaInscripcionComponent
  },
  {
    path: 'calculo-intereses',
    component: CalculoInteresesComponent
  },
  {
    path: 'descargas',
    component: DescargaSipretComponent
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContribuyentesRoutingModule { }
