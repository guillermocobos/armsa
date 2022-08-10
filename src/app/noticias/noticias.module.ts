import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ControlErrorDirectivesModule } from '../shared/helpers/directives/control-errors/control-error-directives.module';
import { SharedModule } from '../shared/shared.module';
import { Util } from '../util';
import { NoticiaCreateComponent } from './noticia-create.component';
import { NoticiaComponent } from './noticia.component';
import { NoticiasRoutingModule } from './noticias-routing.module';
import { NoticiasService } from './noticias.service';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NoticiasRoutingModule,
    ControlErrorDirectivesModule,
    SharedModule
  ],
  declarations: [NoticiaComponent, NoticiaCreateComponent],
  providers: [NoticiasService, Util]
})
export class NoticiasModule { }
