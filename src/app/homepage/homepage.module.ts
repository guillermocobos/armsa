import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgImageSliderModule } from 'ng-image-slider';
import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';
import { Nl2BrPipeModule } from 'nl2br-pipe';
import { NoticiasService } from '../noticias/noticias.service';
import { SharedModule } from '../shared/shared.module';
import { Util } from '../util';
import { HomepageRoutingModule } from './homepage-routing.module';
import { HomepageComponent } from './homepage.component';
import {FullCalendarModule} from "@fullcalendar/angular";
import {DescargaSipretComponent} from '../contribuyentes/descarga-sipret/descarga-sipret.component';
import { ContribuyentesService } from '../contribuyentes/contribuyentes.service';
import { TooltipModule } from 'primeng';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    HomepageRoutingModule,
    NgImageSliderModule,
    NgxUsefulSwiperModule,
    FullCalendarModule,
    Nl2BrPipeModule,
    SharedModule,
    TooltipModule
  ],
  declarations: [HomepageComponent],
  providers: [NoticiasService, Util, ContribuyentesService]
})
export class HomepageModule { }
