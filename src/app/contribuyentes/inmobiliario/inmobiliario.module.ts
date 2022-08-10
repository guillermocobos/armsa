import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { DataTablesModule } from 'angular-datatables';
import { BlockUIModule } from 'ng-block-ui';
import { InmobiliarioService } from './inmobiliario.service';
import { InmobiliarioRoutingModule } from './inmobiliario-routing.module';
import { BlockuiTemplateComponent } from '../../shared/blockUI/blockui-template.component';
import { ClaveFiscalModule } from '../../clave-fiscal/clave-fiscal.module';
import { NgxUpperCaseDirectiveModule } from 'ngx-upper-case-directive';
import {ImpuestoInmobiliarioComponent} from "./emision-boletas/impuesto-inmobiliario/impuesto-inmobiliario.component";
import {ImpuestoInmobiliarioComponent as ImpuestoInmobiliarioEstadoDeudaComponent} from "./estado-deuda/impuesto-inmobiliario/impuesto-inmobiliario.component";
import {TgiComponent} from "./emision-boletas/tgi/tgi.component";
import {TgiComponent as TgiComponentEstadoDeudaComponent} from "./estado-deuda/tgi/tgi.component";
import {PlanesPagoComponent} from "./emision-boletas/planes-pago/planes-pago.component";
import {PlanesPagoComponent as PlanesPagoEstadoDeudaComponent} from "./estado-deuda/planes-pago/planes-pago.component";
import {PagoTarjetaService} from '../../clave-fiscal/boton-pago/pago-tarjeta/pago-tarjeta.service';
import {FormPagoTarjetaModule} from '../../clave-fiscal/boton-pago/pago-tarjeta/form-pago-tarjeta.module';

@NgModule({
  declarations: [
    ImpuestoInmobiliarioComponent,
    TgiComponent,
    PlanesPagoComponent,
    ImpuestoInmobiliarioEstadoDeudaComponent,
    TgiComponentEstadoDeudaComponent,
    PlanesPagoEstadoDeudaComponent
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
    InmobiliarioRoutingModule,
    NgxUpperCaseDirectiveModule,
    FormPagoTarjetaModule
  ],
  providers: [
    InmobiliarioService,
    PagoTarjetaService
  ],
  entryComponents: [BlockuiTemplateComponent]
})
export class InmobiliarioModule { }
