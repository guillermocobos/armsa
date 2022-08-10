import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { DataTablesModule } from 'angular-datatables';
import { BlockUIModule } from 'ng-block-ui';
import { InmobiliarioService } from './inmobiliario.service';
import { BlockuiTemplateComponent } from '../../shared/blockUI/blockui-template.component';
import { ClaveFiscalModule } from '../../clave-fiscal/clave-fiscal.module';
import {PagoTarjetaService} from '../../clave-fiscal/boton-pago/pago-tarjeta/pago-tarjeta.service';
import {InmobiliarioStandaloneRoutingModule} from "./inmobiliario-standalone-routing.module";
import {FormPagoTarjetaModule} from "../../clave-fiscal/boton-pago/pago-tarjeta/form-pago-tarjeta.module";
import {InmobiliarioModule} from "./inmobiliario.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    DataTablesModule,
    ClaveFiscalModule,
    BlockUIModule.forRoot({
      message: 'Cargando...',
      template: BlockuiTemplateComponent
    }),
    InmobiliarioStandaloneRoutingModule,
    InmobiliarioModule,
    FormPagoTarjetaModule
  ],
  providers: [
    InmobiliarioService,
    PagoTarjetaService
  ],
  entryComponents: [BlockuiTemplateComponent]
})
export class InmobiliarioStandaloneModule { }
