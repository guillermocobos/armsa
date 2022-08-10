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
import {F982Component} from "./f982.component";
import {F982Service} from "./f982.service";
import {F982RoutingModule} from "./f982-routing.module";
import {TableModule} from 'primeng/table';
import {CheckboxModule} from 'primeng/checkbox';
import {CtaCteUnificadaModule} from "../cta-cte-unificada/cta-cte-unificada.module";


@NgModule({
  declarations: [
    F982Component
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
    F982RoutingModule,
    TableModule,
    CheckboxModule,
    CtaCteUnificadaModule
  ],
  exports: [
    F982Component
  ],
  providers: [
    ClaveFiscalService,
    F982Service,
    AuthenticationService,
    Util
  ]
})
export class F982Module { }
