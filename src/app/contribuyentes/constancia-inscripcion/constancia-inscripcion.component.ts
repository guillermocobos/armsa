import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import * as FileSaver from 'file-saver';
import cuitValidator from '../../shared/helpers/validators/cuit-validator';
import { ContribuyentesService } from '../contribuyentes.service';

@Component({
  selector: 'app-constancia-inscripcion',
  templateUrl: './constancia-inscripcion.component.html'
})
export class ConstanciaInscripcionComponent implements OnInit, OnDestroy {

  form: FormGroup;
  customErrorCuit = {cuit: 'El CUIT ingresado es inválido'};
  customErrorCaptcha = {required: 'Debe marcar la casilla de verificación'};
  errorConstancia;
  loading = false;
  submitted = false;

  private validarSubscription: Subscription;
  private generarSubscription: Subscription;

  constructor(private fb: FormBuilder, private contribuyentesService: ContribuyentesService) { }

  ngOnInit() {
    this.form = this.fb.group({
      cuit: [null, [Validators.required, cuitValidator]],
      recaptcha: [null, Validators.required]
    }, {updateOn: 'blur'});
  }

  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.form.valid) {
      this.loading = true;
      this.validarSubscription = this.contribuyentesService.validarConstanciaInscripcion(this.form.get('cuit').value)
        .subscribe((data: any) => {
          if (data.PERSONA_ID) {
            this.generarSubscription = this.contribuyentesService.generarConstanciaInscripcion(data.PERSONA_ID)
              .subscribe((response: any) => {
                this.errorConstancia = undefined;
                this.loading = false;
                const blob = new Blob([response], {
                  type: 'application/pdf'
                });
                FileSaver.saveAs(blob, `constancia_inscripcion_${data.PERSONA_ID}.pdf`);
                // const fileURL = URL.createObjectURL(blob);
                // window.open(fileURL);
                this.onReset();
            });
          }
        }, (err) => {
          this.loading = false;
          if (err.status === 400) {
            this.errorConstancia = err.error.message;
          }
        });
    }
  }

  onReset() {
    this.form.reset();
    this.submitted = false;
  }

  ngOnDestroy() {
    if (this.validarSubscription) {
      this.validarSubscription.unsubscribe();
    }
    if (this.generarSubscription) {
      this.generarSubscription.unsubscribe();
    }
  }

}
