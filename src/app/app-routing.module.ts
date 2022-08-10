import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './authentication/auth.guard';

const routes: Routes = [
    {
        path: 'inicio',
        loadChildren: () => import('./homepage/homepage.module').then(m => m.HomepageModule)
    },
    {
      path: 'auth',
      loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule)
    },
    {
      path: 'contribuyentes',
      loadChildren: () => import('./contribuyentes/contribuyentes.module').then(m => m.ContribuyentesModule)
    },
    {
      path: 'noticias',
      loadChildren: () => import('./noticias/noticias.module').then(m => m.NoticiasModule)
    },
    {
      path: 'clave-fiscal',
      canActivate: [AuthGuard],
      canActivateChild: [AuthGuard],
      loadChildren: () => import('./clave-fiscal/clave-fiscal.module').then(m => m.ClaveFiscalModule)
    },
    {
      path: 'automotores',
      loadChildren: () => import('./contribuyentes/automotor/automotores.module').then(m => m.AutomotoresModule)
    },
    {
      path: 'inmobiliario',
      loadChildren: () => import('./contribuyentes/inmobiliario/inmobiliario.module').then(m => m.InmobiliarioModule)
    },
    {
      path: 'inmobiliario-standalone',
      loadChildren: () => import('./contribuyentes/inmobiliario/inmobiliario-standalone.module').then(m => m.InmobiliarioStandaloneModule)
    },
    {
      path: 'automotores-standalone',
      loadChildren: () => import('./contribuyentes/automotor/automotores-standalone.module').then(m => m.AutomotoresStandaloneModule)
    },
    {
        path: '',
        redirectTo: 'inicio',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
