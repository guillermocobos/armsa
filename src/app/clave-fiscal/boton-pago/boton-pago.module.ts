import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MenuOpemComponent } from './opem/menu-opem.component';
import { GeneracionOpemComponent } from './opem/generacion-opem.component';
import { SharedModule } from '../../shared/shared.module';
import { BotonPagoMenuComponent } from './boton-pago-menu.component';
import { BotonPagoRoutingModule } from './boton-pago-routing.module';
import { DataTablesModule } from 'angular-datatables';
import { BotonPagoService } from './boton-pago.service';
import { BlockUIModule } from 'ng-block-ui';
import { BlockuiTemplateComponent } from '../../shared/blockUI/blockui-template.component';

import {TableModule} from 'primeng/table';
import {CheckboxModule} from 'primeng/checkbox';
import {BlockUIModule as PrimeBlockUIModule} from 'primeng/blockui';
import { PagoTarjetaComponent } from './pago-tarjeta/pago-tarjeta.component';
import { InputTextModule } from 'primeng';
import { CtaCteUnificadaModule } from '../cta-cte-unificada/cta-cte-unificada.module';
import { FormPagoTarjetaModule } from './pago-tarjeta/form-pago-tarjeta.module';
import { PagoTarjetaService } from './pago-tarjeta/pago-tarjeta.service';

@NgModule({
  declarations: [
    MenuOpemComponent,
    GeneracionOpemComponent,
    BotonPagoMenuComponent,
    PagoTarjetaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BotonPagoRoutingModule,
    SharedModule,
    DataTablesModule,
    TableModule,
    InputTextModule,
    BlockUIModule.forRoot({
      message: 'Cargando...',
      template: BlockuiTemplateComponent
    }),
    CtaCteUnificadaModule,
    FormPagoTarjetaModule,
    CheckboxModule,
    PrimeBlockUIModule
  ],
  providers: [
    BotonPagoService,
    PagoTarjetaService
  ],
  entryComponents: [BlockuiTemplateComponent]
})
export class BotonPagoModule { }
