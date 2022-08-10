import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { BlockUIModule } from 'ng-block-ui';
import { PadronesComponent } from './padrones/padrones.component';
import { PublicidadPropagandaComponent } from './publicidad-propaganda.component';
import { SharedModule } from '../../shared/shared.module';
import { BlockuiTemplateComponent } from '../../shared/blockUI/blockui-template.component';
import { ClaveFiscalService } from '../clave-fiscal.service';
import { AuthenticationService } from '../../authentication/signin/authentication.service';
import { Util } from '../../util';
import { PublicidadPropagandaRoutingModule } from './publicidad-propaganda-routing.module';
import { CargaDDJJCartelesComponent } from './padrones/carteles/carga-ddjj-carteles.component';
import { ArchwizardModule } from 'angular-archwizard';
import {PublicidadPropagandaService} from "./publicidad-propaganda.service";
import {ConsultaDdjjComponent} from "./consulta-ddjj/consulta-ddjj.component";
import {CargaDDJJVehiculosComponent} from "./padrones/vehiculos/carga-ddjj-vehiculos.component";

@NgModule({
  declarations: [
    PublicidadPropagandaComponent,
    PadronesComponent,
    CargaDDJJCartelesComponent,
    ConsultaDdjjComponent,
    CargaDDJJVehiculosComponent
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
    PublicidadPropagandaRoutingModule,
    ArchwizardModule
  ],
  providers: [
    ClaveFiscalService,
    PublicidadPropagandaService,
    AuthenticationService,
    Util
  ],
  entryComponents: [BlockuiTemplateComponent]
})
export class PublicidadPropagandaModule { }

