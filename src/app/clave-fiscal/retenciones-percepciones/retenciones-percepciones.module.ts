import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { DataTablesModule } from 'angular-datatables';
import { BlockUIModule } from 'ng-block-ui';
import { BlockuiTemplateComponent } from '../../shared/blockUI/blockui-template.component';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng';
import { CheckboxModule } from 'primeng/checkbox';
import { BlockUIModule as PrimeBlockUIModule} from 'primeng/blockui';
import { RetencionesPercepcionesMenuComponent } from './retenciones-percepciones-menu.component';
import { RetencionesPercepcionesRoutingModule  } from './retenciones-percepciones-routing.module';
import { ConsultaPadronComponent } from './consultas-padron/consulta-padron/consulta-padron.component';
import { RetencionesPercepcionesService } from './retenciones-percepciones.service';
import { Util } from '../../util';

@NgModule({
    declarations: [
      RetencionesPercepcionesMenuComponent,
      ConsultaPadronComponent
    ],
    imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      RetencionesPercepcionesRoutingModule,
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
      RetencionesPercepcionesService,
      Util
    ],
    entryComponents: [BlockuiTemplateComponent]
  })

  export class RetencionesPercepcionesModule { }