import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RECAPTCHA_LANGUAGE, RECAPTCHA_SETTINGS, RecaptchaModule, RecaptchaSettings } from 'ng-recaptcha';
import { RecaptchaFormsModule } from 'ng-recaptcha';
import { environment } from '../../environments/environment';
import { ConstanciaInscripcionComponent } from '../contribuyentes/constancia-inscripcion/constancia-inscripcion.component';
import { SharedModule } from '../shared/shared.module';

import { ControlErrorDirectivesModule } from '../shared/helpers/directives/control-errors/control-error-directives.module';
import { CalculoInteresesComponent } from './calculo-intereses/calculo-intereses.component';
import { ContribuyentesRoutingModule } from './contribuyentes-routing.module';
import { ContribuyentesService } from './contribuyentes.service';
import { DescargaSipretComponent } from './descarga-sipret/descarga-sipret.component';



@NgModule({
  declarations: [
    ConstanciaInscripcionComponent,
    CalculoInteresesComponent,
    DescargaSipretComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    ContribuyentesRoutingModule,
    SharedModule
  ],
  providers: [
    ContribuyentesService,
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: { siteKey: environment.RECAPTCHA_KEY} as RecaptchaSettings,
    }, {
      provide: RECAPTCHA_LANGUAGE,
      useValue: 'es'
    }
  ]
})
export class ContribuyentesModule { }
