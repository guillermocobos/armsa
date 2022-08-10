import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { BlockUIModule } from 'ng-block-ui';
import { AuthenticationService } from '../authentication/signin/authentication.service';
import { BlockuiTemplateComponent } from '../shared/blockUI/blockui-template.component';
import { SharedModule } from '../shared/shared.module';
import { Util } from '../util';
import { ClaveFiscalRoutingModule } from './clave-fiscal-routing.module';
import { ClaveFiscalService } from './clave-fiscal.service';
import { BoletaPagoPlanesComponent } from './consulta-cuenta-unica/boleta-pago-planes.component';
import { BoletaPagoComponent } from './consulta-cuenta-unica/boleta-pago.component';
import { ConsultaCuentaUnicaComponent } from './consulta-cuenta-unica/consulta-cuenta-unica.component';
import { DatosInscripcionComponent } from './consulta-cuenta-unica/datos-inscripcion.component';
import { EstadoDeudaPlanesComponent } from './consulta-cuenta-unica/estado-deuda-planes.component';
import { EstadoDeudaComponent } from './consulta-cuenta-unica/estado-deuda.component';
import { DatosContribuyenteComponent } from './datos-contribuyente/datos-contribuyente.component';
import { ConsultaDDJJComponent } from './declaraciones-juradas/consulta-ddjj.component';
import { DeclaracionesJuradasComponent } from './declaraciones-juradas/declaraciones-juradas.component';
import { PresentacionDDJJComponent } from './declaraciones-juradas/presentacion-ddjj.component';
import { MenuPrincipalComponent } from './menu-principal/menu-principal.component';
import { PublicidadPropagandaModule } from './publicidad-propaganda/publicidad-propaganda.module';


@NgModule({
  declarations: [
    MenuPrincipalComponent,
    ConsultaCuentaUnicaComponent,
    DatosInscripcionComponent,
    BoletaPagoComponent,
    EstadoDeudaComponent,
    DatosContribuyenteComponent,
    EstadoDeudaPlanesComponent,
    BoletaPagoPlanesComponent,
    PresentacionDDJJComponent,
    DeclaracionesJuradasComponent,
    ConsultaDDJJComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ClaveFiscalRoutingModule,
    SharedModule,
    DataTablesModule,
    BlockUIModule.forRoot({
      message: 'Cargando...',
      template: BlockuiTemplateComponent
    }),
    PublicidadPropagandaModule
  ],
  providers: [
    ClaveFiscalService,
    AuthenticationService,
    Util
  ],
  entryComponents: [BlockuiTemplateComponent]
})
export class ClaveFiscalModule { }

