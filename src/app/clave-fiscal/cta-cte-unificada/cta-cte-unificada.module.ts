import {NgModule} from "@angular/core";
import {BlockuiTemplateComponent} from "../../shared/blockUI/blockui-template.component";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../../shared/shared.module";
import {DataTablesModule} from "angular-datatables";
import {BlockUIModule} from "ng-block-ui";
import {ClaveFiscalService} from "../clave-fiscal.service";
import {AuthenticationService} from "../../authentication/signin/authentication.service";
import {Util} from "../../util";
import {CtaCteUnificadaComponent} from "./cta-cte-unificada.component";
import {CtaCteUnificadaService} from "./cta-cte-unificada.service";
import {CtaCteUnificadaRoutingModule} from "./cta-cte-unificada-routing.module";
import {TableModule} from 'primeng/table';
import {CheckboxModule} from 'primeng/checkbox';
import {TablaDeudasComponent} from "./tabla-deudas.component";

@NgModule({
  declarations: [
    CtaCteUnificadaComponent,
    TablaDeudasComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    DataTablesModule,
    BlockUIModule.forRoot({
      message: 'Cargando...',
      template: BlockuiTemplateComponent
    }),
    CtaCteUnificadaRoutingModule,
    TableModule,
    CheckboxModule
  ],
  exports: [
    CtaCteUnificadaComponent,
    TablaDeudasComponent
  ],
  providers: [
    ClaveFiscalService,
    CtaCteUnificadaService,
    AuthenticationService,
    Util
  ]
})
export class CtaCteUnificadaModule { }
