import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { DataTablesModule } from 'angular-datatables';
import { BlockUIModule } from 'ng-block-ui';
import { BlockuiTemplateComponent } from '../../shared/blockUI/blockui-template.component';
import {CtaCteUnificadaModule} from "../cta-cte-unificada/cta-cte-unificada.module";
import {TableModule} from 'primeng/table';
import {InputTextModule} from "primeng";
import {CheckboxModule} from 'primeng/checkbox';
import {BlockUIModule as PrimeBlockUIModule} from 'primeng/blockui';
import {LibreDeudasMenuComponent} from "./libre-deudas-menu.component";
import {LibreDeudasRoutingModule} from "./libre-deudas-routing.module";
import {LibreDeudasService} from "./libre-deudas.service";
import {SolicitudLibreDeudasComponent} from "./solicitud-libre-deudas/solicitud-libre-deudas.component";
import {ListaCertificadosComponent} from "./lista-certificados/lista-certificados.component";


@NgModule({
  declarations: [
    LibreDeudasMenuComponent,
    SolicitudLibreDeudasComponent,
    ListaCertificadosComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LibreDeudasRoutingModule,
    SharedModule,
    DataTablesModule,
    TableModule,
    InputTextModule,
    BlockUIModule.forRoot({
      message: 'Cargando...',
      template: BlockuiTemplateComponent
    }),
    CheckboxModule,
    PrimeBlockUIModule
  ],
  providers: [
    LibreDeudasService
  ],
  entryComponents: [BlockuiTemplateComponent]
})
export class LibreDeudasModule { }
