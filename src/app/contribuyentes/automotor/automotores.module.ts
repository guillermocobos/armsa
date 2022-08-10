import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { DataTablesModule } from 'angular-datatables';
import { BlockUIModule } from 'ng-block-ui';
import { AutomotoresService } from './automotores.service';
import { ImpuestoAutomotorComponent } from './emision-boletas/impuesto-automotor/impuesto-automotor.component';
import { ImpuestoAutomotorComponent as ImpuestoAutomotorEstadoCuentaComponent} from './estado-deuda/impuesto-automotor/impuesto-automotor.component';
import { AutomotoresRoutingModule } from './automotores-routing.module';
import { BlockuiTemplateComponent } from '../../shared/blockUI/blockui-template.component';
import { ClaveFiscalModule } from '../../clave-fiscal/clave-fiscal.module';
import { NgxUpperCaseDirectiveModule } from 'ngx-upper-case-directive';
import { TasaAmbientalComponent } from './emision-boletas/tasa-ambiental/tasa-ambiental.component';
import { MultasTransitoComponent } from './emision-boletas/multas-transito/multas-transito.component';
import {HistorialMultasTransitoComponent} from "./emision-boletas/historial-multas-transito/historial-multas-transito.component";
import {PlanesPagoComponent} from "./emision-boletas/planes-pago/planes-pago.component";
import {PlanesPagoComponent as PlanesPagoEstadoDeudaComponent} from "./estado-deuda/planes-pago/planes-pago.component";
import {TasaAmbientalComponent as TasaAmbientalEstadoDeudaComponent} from "./estado-deuda/tasa-ambiental/tasa-ambiental.component";
import {SolicitudConstanciaDeudaComponent} from "./estado-deuda/solicitud-constancia-deuda/solicitud-constancia-deuda.component";
import {ConsultaConstanciaDeudaComponent} from "./estado-deuda/consulta-constancia-deuda/consulta-constancia-deuda.component";
import {FormPagoTarjetaModule} from '../../clave-fiscal/boton-pago/pago-tarjeta/form-pago-tarjeta.module';
import {PagoTarjetaService} from '../../clave-fiscal/boton-pago/pago-tarjeta/pago-tarjeta.service';

@NgModule({
  declarations: [
    ImpuestoAutomotorComponent,
    TasaAmbientalComponent,
    MultasTransitoComponent,
    HistorialMultasTransitoComponent,
    PlanesPagoComponent,
    ImpuestoAutomotorEstadoCuentaComponent,
    TasaAmbientalEstadoDeudaComponent,
    PlanesPagoEstadoDeudaComponent,
    SolicitudConstanciaDeudaComponent,
    ConsultaConstanciaDeudaComponent
  ],
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
    AutomotoresRoutingModule,
    NgxUpperCaseDirectiveModule,
    FormPagoTarjetaModule
  ],
  providers: [
    AutomotoresService,
    PagoTarjetaService
  ],
  entryComponents: [BlockuiTemplateComponent]
})
export class AutomotoresModule { }
