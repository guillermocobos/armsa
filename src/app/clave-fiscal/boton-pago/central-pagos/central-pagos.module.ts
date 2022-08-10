import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CentralPagosComponent } from './pagos/central-pagos.component';
import { ConsultaPagosElectronicosComponent } from './consulta-pagos-electronicos/consulta-pagos-electronicos.component';
import { CentralPagosService } from './central-pagos.service';
import { CentralPagosRoutingModule } from './central-pagos-routing.module';
import { SharedModule } from '../../../shared/shared.module';
import { BlockUIModule } from 'ng-block-ui';
import { IConfig } from 'ngx-mask';
import { BlockuiTemplateComponent } from '../../../shared/blockUI/blockui-template.component';
import { DirectivesModule } from '../../../shared/helpers/directives/directives.module';
import { CtaCteUnificadaModule } from '../../cta-cte-unificada/cta-cte-unificada.module';
import { FormPagoTarjetaModule } from '../pago-tarjeta/form-pago-tarjeta.module';
import { PagoMisCuentasComponent } from './pagos/pagomiscuentas/pagomiscuentas.component';
import { PagoMisCuentasService } from './pagos/pagomiscuentas/pagomiscuentas.service';
import { Util } from '../../../util';
import { NgxUpperCaseDirectiveModule } from 'ngx-upper-case-directive';


export const options: Partial<IConfig> | (() => Partial<IConfig>) = {};

@NgModule({
  declarations: [
    CentralPagosComponent,
    ConsultaPagosElectronicosComponent,
    PagoMisCuentasComponent
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
    DirectivesModule,
    CentralPagosRoutingModule,
    CtaCteUnificadaModule,
    FormPagoTarjetaModule,
    NgxUpperCaseDirectiveModule
  ],
  providers: [
    CentralPagosService,
    PagoMisCuentasService,
    Util
  ]
})
export class CentralPagosModule { }
