import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {BlockUIModule} from "ng-block-ui";
import {BlockuiTemplateComponent} from "../../../shared/blockUI/blockui-template.component";
import {FormPagoTarjetaComponent} from "./form-pago-tarjeta.component";
import {PagoTarjetaService} from "./pago-tarjeta.service";
import {SharedModule} from "../../../shared/shared.module";
import {NgxUpperCaseDirectiveModule} from "ngx-upper-case-directive";
import {DirectivesModule} from "../../../shared/helpers/directives/directives.module";
import {IConfig, NgxMaskModule} from "ngx-mask";
import {ScrollToModule, ScrollToService} from "@nicky-lenaers/ngx-scroll-to";

export const options: Partial<IConfig> | (() => Partial<IConfig>) = {};

@NgModule({
  declarations: [
    FormPagoTarjetaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    BlockUIModule.forRoot({
      message: 'Cargando...',
      template: BlockuiTemplateComponent
    }),
    NgxUpperCaseDirectiveModule,
    DirectivesModule,
    NgxMaskModule.forRoot(options),
    ScrollToModule.forRoot()
  ],
  providers: [
    PagoTarjetaService,
    ScrollToService
  ],
  exports: [
    FormPagoTarjetaComponent
  ]
})
export class FormPagoTarjetaModule { }
