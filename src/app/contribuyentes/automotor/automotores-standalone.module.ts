import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { DataTablesModule } from 'angular-datatables';
import { BlockUIModule } from 'ng-block-ui';

import { BlockuiTemplateComponent } from '../../shared/blockUI/blockui-template.component';
import { ClaveFiscalModule } from '../../clave-fiscal/clave-fiscal.module';
import {PagoTarjetaService} from '../../clave-fiscal/boton-pago/pago-tarjeta/pago-tarjeta.service';
import {AutomotoresStandaloneRoutingModule} from "./automotores-standalone-routing.module";
import {FormPagoTarjetaModule} from "../../clave-fiscal/boton-pago/pago-tarjeta/form-pago-tarjeta.module";
import {AutomotoresService} from './automotores.service';
import {AutomotoresModule} from './automotores.module';

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
    AutomotoresStandaloneRoutingModule,
    AutomotoresModule,
    FormPagoTarjetaModule
  ],
  providers: [
    AutomotoresService,
    PagoTarjetaService
  ],
  entryComponents: [BlockuiTemplateComponent]
})
export class AutomotoresStandaloneModule { }
