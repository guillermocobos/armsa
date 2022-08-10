import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { EstructurasAntenasMenuComponent } from './estructuras-antenas-menu.component';
import { EstructurasAntenasRoutingModule } from './estructuras-antenas-routing.module';
import { DataTablesModule } from 'angular-datatables';
import { EstructurasAntenasService } from './estructuras-antenas.service';
import { BlockUIModule } from 'ng-block-ui';
import { BlockuiTemplateComponent } from '../../shared/blockUI/blockui-template.component';
import {EstructurasSoporteComponent} from "./estructuras/estructuras-soporte.component";
import {DirectivesModule} from "../../shared/helpers/directives/directives.module";
import {TasaInspeccionComponent} from "./tasa-inspeccion/tasa-inspeccion.component";
import {CuentaTributariaComponent} from "./cuenta-tributaria/cuenta-tributaria.component";

@NgModule({
  declarations: [
    EstructurasAntenasMenuComponent,
    EstructurasSoporteComponent,
    TasaInspeccionComponent,
    CuentaTributariaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    EstructurasAntenasRoutingModule,
    SharedModule,
    DataTablesModule,
    BlockUIModule.forRoot({
      message: 'Cargando...',
      template: BlockuiTemplateComponent
    }),
    DirectivesModule
  ],
  providers: [
    EstructurasAntenasService
  ],
  entryComponents: [BlockuiTemplateComponent]
})
export class EstructurasAntenasModule { }
