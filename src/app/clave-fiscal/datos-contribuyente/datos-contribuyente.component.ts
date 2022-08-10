import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../../authentication/signin/authentication.service';

import { ContribuyenteModel } from '../../models/contribuyente.model';
import { DomicilioContribuyenteModel } from '../../models/domicilio-contribuyente.model';
import { PadronContribuyenteModel } from '../../models/padron-contribuyente.model';
import { ResponsableContribuyenteModel } from '../../models/responsable-contribuyente.model';
import { ClaveFiscalService } from '../clave-fiscal.service';

declare const $: any;

@Component({
  selector: 'app-datos-contribuyente',
  templateUrl: './datos-contribuyente.component.html',
  styles: [`
    .inscripcionCabecera .col-xs-12 {
      margin-bottom: 0px !important;
    }
    .inscripcionCabecera .col-xs-12 span {
      font-size: 12px;
      margin-left: 5px;
    }
    .inscripcionCabecera .col-xs-12 hr {
      margin-top: 5px;
      margin-bottom: 5px;
    }
    .table thead tr th {
      padding: 10px;
      border-bottom: 1px solid #eee;
      font-size: 12px;
    }
    .table tbody tr td {
      font-size: 12px;
    }
    h5, .h5 {
      font-size: 0.9rem;
    }
  `]
})
export class DatosContribuyenteComponent implements OnInit, OnDestroy {

  datosContribuyentesSubscription: Subscription;
  contribuyente: ContribuyenteModel;
  domicilio: DomicilioContribuyenteModel;
  padrones: PadronContribuyenteModel[] = [];
  responsables: ResponsableContribuyenteModel[] = [];
  formEmail: FormGroup;
  submitted = false;
  loading = false;
  actualizarEmailSubscription: Subscription;

  @BlockUI('visualizar-datos') blockVisualizarDatos: NgBlockUI;
  @ViewChild('actualizarEmailModal', {static: false}) actualizarEmail: ElementRef;

  constructor(
    private authenticationService: AuthenticationService,
    private fb: FormBuilder,
    private claveFiscalService: ClaveFiscalService) {}

  ngOnInit() {
    this.blockVisualizarDatos.start();
    this.formEmail = this.fb.group({
      email: [null, [
        Validators.required,
        Validators.pattern('^[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$')]
      ]
    }, {updateOn: 'blur'});
    const personaId = this.authenticationService.getSessionUserId();
    this.datosContribuyentesSubscription = this.claveFiscalService.consultaDatosContribuyente(personaId)
      .subscribe((datos) => {
        this.contribuyente = datos.contribuyente;
        this.padrones = datos.padrones;
        this.responsables = datos.responsables;
        this.domicilio = datos.domicilio;
        this.blockVisualizarDatos.stop();
      });
  }

  ngOnDestroy() {
    if (this.datosContribuyentesSubscription) {
      this.datosContribuyentesSubscription.unsubscribe();
    }
    if (this.actualizarEmailSubscription) {
      this.actualizarEmailSubscription.unsubscribe();
    }
  }

  openModalActualizarEmail() {
    $(this.actualizarEmail.nativeElement).modal('show');
  }

  closeModalActualizarEmail() {
    $(this.actualizarEmail.nativeElement).modal('hide');
  }

  onSubmitActualizarEmail() {
    this.submitted = true;
    if (this.formEmail.valid) {
      this.loading = true;
      this.actualizarEmailSubscription = this.claveFiscalService.actualizarEmail(this.formEmail.value)
        .subscribe((data: any) => {

          this.loading = false;
        }, (err) => {
          this.loading = false;
        });
    }
  }
}
