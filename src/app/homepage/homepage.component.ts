import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { SwiperOptions } from 'swiper';
import dayGridPlugin from '@fullcalendar/daygrid';
import { environment } from '../../environments/environment';
import { Noticia } from '../noticias/noticia.model';
import { NoticiasService } from '../noticias/noticias.service';
import {Subscription} from 'rxjs';
import {ContribuyentesService} from '../contribuyentes/contribuyentes.service';
import * as FileSaver from 'file-saver';
import { v1 as uuidv1 } from 'uuid';

declare const $: any;

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styles: [`
    swiper {
      height: 400px;
      width: 100%;
    }
    swiper .swiper-slide {
        text-align: center;
        font-size: 18px;
        background: #fff;
        /* Center slide text vertically */
        display: -webkit-box;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        -webkit-justify-content: center;
        justify-content: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        -webkit-align-items: center;
        align-items: center;
      }
    .swiper-button-prev-armsa,
    .swiper-button-next-armsa {
      position: absolute;
      top: 50%;
      width: 27px;
      height: 44px;
      margin-top: -22px;
      z-index: 10;
      cursor: pointer;
      background-size: 27px 44px;
      background-position: center;
      background-repeat: no-repeat;
    }
    .swiper-button-prev-armsa.swiper-button-disabled,
    .swiper-button-next-armsa.swiper-button-disabled {
      opacity: 0.35;
      cursor: auto;
      pointer-events: none;
    }
    .swiper-button-prev-armsa {
      background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M0%2C22L22%2C0l2.1%2C2.1L4.2%2C22l19.9%2C19.9L22%2C44L0%2C22L0%2C22L0%2C22z'%20fill%3D'%231c4370'%2F%3E%3C%2Fsvg%3E");
      left: 10px;
      right: auto;
    }
    .swiper-button-next-armsa {
      background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M27%2C22L27%2C22L5%2C44l-2.1-2.1L22.8%2C22L2.9%2C2.1L5%2C0L27%2C22L27%2C22z'%20fill%3D'%231c4370'%2F%3E%3C%2Fsvg%3E");
      right: 10px;
      left: auto;
    }
    ::ng-deep .swiper-pagination-bullet-active {
      opacity: 1;
      background: #1c4370;
    }
    ::ng-deep .swiper-container {
        padding-left: 50px;
        padding-right: 50px;
      }
    ::ng-deep .fc-day-top {
      background: #eee!important;
    }
    ::ng-deep .fc table {
      font-size: 0.9em;
    }
  `]
})
export class HomepageComponent implements OnInit, OnDestroy {

  @ViewChild('modalCalendarEvent', {static: false}) modalCalendarEvent;

  config: SwiperOptions = {
    pagination: { el: '.swiper-pagination', clickable: true },
    navigation: {
      nextEl: '.swiper-button-next-armsa',
      prevEl: '.swiper-button-prev-armsa'
    },
    spaceBetween: 100,
    slidesPerView: 'auto',
    height: 400,
    autoplay: {
      delay: 5000,
    },
    breakpoints: {
      1024: {
        slidesPerView: 1,
        spaceBetween: 100,
      },
      768: {
        slidesPerView: 1,
        spaceBetween: 100,
      },
      640: {
        slidesPerView: 1,
        spaceBetween: 100,
      },
      320: {
        slidesPerView: 1,
        spaceBetween: 100,
      }
    }
  };
  impuestosCalendario = [
    {impuesto: '0006', concepto: '0006', leyenda: 'Automotor', color: '#f44336'},
    {impuesto: '0007', concepto: '0006', leyenda: 'Inm Urbano', color: '#4caf50'},
    {impuesto: '0008', concepto: '0006', leyenda: 'T.G.I', color: '#e08659'},
    {impuesto: '0042', concepto: '0006', leyenda: 'Tasa Protección Ambiental', color: '#94a080'},
    {impuesto: '0011', concepto: '0004', leyenda: 'TISSH-PROCOM', color: '#6cb0b0'},
    {impuesto: '0012', concepto: '0004', leyenda: 'TISSH-REG. GRAL.', color: '#274b66'},
    {impuesto: '0014', concepto: '0006', leyenda: 'TISSH-PyP', color: '#7d44cd'},
  ];
  calendarEvents;
  calendarButtonText = {
    today:    'Hoy',
    month:    'Mes',
    week:     'Semana',
    day:      'Día',
    list:     'Lista'
  }

  calendarPlugins = [dayGridPlugin];
  noticias: Noticia[] = [];
  staticServer = environment.STATIC_SERVER;
  loading =  false;
  inicio = true;
  descargas = false;
  descargaSubscription: Subscription;
  vencimientosSubscription: Subscription;
  noticiasSubscription: Subscription;

  constructor(
    private noticiasService: NoticiasService,
    private contribuyenteService: ContribuyentesService
  ) {}

  ngOnInit() {
    this.inicio = true;
    this.descargas = false;
    this.getNoticias();
    this.vencimientosImpuestos();
  }

  descargaAACC() {
    this.loading = true;
    this.descargaSubscription = this.contribuyenteService.descargarAACC()
      .subscribe((response: any) => {
        const blob = new Blob([response], {
          type: 'application/pdf'
        });
        FileSaver.saveAs(blob, 'actividades-comerciales.pdf');
        this.loading = false;
      }, (err) => {
        this.loading = false;
      });
  }

  descargarInstructivo(){
    this.loading = true;
    this.descargaSubscription = this.contribuyenteService.descargarInstructivoMobile()
      .subscribe((response: any) => {
        const blob = new Blob([response], {
          type: 'application/pdf'
        });
        FileSaver.saveAs(blob, 'InstructivoAccesoDirectoARMSaMobile.pdf');
        this.loading = false;
      }, (err) => {
        this.loading = false;
      });

  }
  muestraDescargas(){
    this.inicio = false;
    this.descargas = true;
  }

  descargarSipret() {
    this.loading = true;
    this.descargaSubscription = this.contribuyenteService.descargarSipret()
      .subscribe((response: any) => {
        const blob = new Blob([response], {
          type: 'application/pdf'
        });
        FileSaver.saveAs(blob, 'SIPRET.zip');
        this.loading = false;
      }, (err) => {
        this.loading = false;
      });
  }


  descargaAutomotor() {
    this.loading = true;

    this.descargaSubscription = this.contribuyenteService.descargarAutomotor()
      .subscribe((response: any) => {
        const blob = new Blob([response], {
          type: 'application/pdf'
        });
        FileSaver.saveAs(blob, 'Automotores.pdf');
        this.loading = false;
      }, (err) => {
        this.loading = false;
      });
  }

  descargaInmobiliario() {
    this.loading = true;
    this.descargaSubscription = this.contribuyenteService.descargarInmobiliario()
      .subscribe((response: any) => {
        const blob = new Blob([response], {
          type: 'application/pdf'
        });
        FileSaver.saveAs(blob, 'Inmobiliario.pdf');
        this.loading = false;
      }, (err) => {
        this.loading = false;
      });
  }

  getNoticias() {
    this.noticiasSubscription = this.noticiasService.getNoticiasPortada()
      .subscribe((noticias: Noticia[]) => {
        this.noticias = noticias;
      });
  }

  vencimientosImpuestos() {
    const body = {
      impuestosCalendario: this.impuestosCalendario
    };
    this.contribuyenteService.vencimientosImpuestos(body)
      .subscribe((response: any) => {
        this.calendarEvents = [];
        response.forEach((vencimientosImp) => {
          const vencimientos = vencimientosImp.vencimientos.split(',');
          vencimientos.forEach((vencimiento) => {
            this.calendarEvents.push({
              title: vencimientosImp.leyenda,
              date: vencimiento,
              id: uuidv1(),
              color: vencimientosImp.color
            });
          });
        });
      });
  }

  eventRender(event) {
    const element = event.el;
    element.title = event.event.title;
    $(event.el).tooltip();
  }

  ngOnDestroy() {
    if (this.noticiasSubscription) {
      this.noticiasSubscription.unsubscribe();
    }
    if (this.descargaSubscription) {
      this.descargaSubscription.unsubscribe();
    }
    if (this.vencimientosSubscription) {
      this.vencimientosSubscription.unsubscribe();
    }
  }
}
