import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { ContribuyentesService } from '../contribuyentes.service';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-descarga-sipret',
  templateUrl: './descarga-sipret.component.html'
})
export class DescargaSipretComponent {

  loading = false;
  loadingInstructivo = false; //JSilva, Incid 109523
  loadingSipret = false; //JSilva, Incid 109523
  descargaSubscription: Subscription;

  constructor(private contribuyentesService: ContribuyentesService) {}

  descargarSipret() {
    this.loadingSipret = true; //JSilva, Incid 109523
    this.descargaSubscription = this.contribuyentesService.descargarSipret()
      .subscribe((response: any) => {
        const blob = new Blob([response], {
          type: 'application/pdf'
        });
        FileSaver.saveAs(blob, 'SIPRET.zip');
        this.loadingSipret = false; //JSilva, Incid 109523
      }, (err) => {
        this.loadingSipret = false; //JSilva, Incid 109523
      });
  }

  descargarInstructivo(){
    this.loadingInstructivo = true; //JSilva, Incid 109523
    this.descargaSubscription = this.contribuyentesService.descargarInstructivoMobile()
      .subscribe((response: any) => {
        const blob = new Blob([response], {
          type: 'application/pdf'
        });
        FileSaver.saveAs(blob, 'InstructivoAccesoDirectoARMSaMobile.pdf');
        this.loadingInstructivo = false;  //JSilva, Incid 109523
      }, (err) => {
        this.loadingInstructivo = false;  //JSilva, Incid 109523
      });

  }
}
