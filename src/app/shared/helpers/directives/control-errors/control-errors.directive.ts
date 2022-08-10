import {
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  Host,
  Inject,
  Input,
  OnInit,
  Optional,
  ViewContainerRef
} from '@angular/core';
import { NgControl } from '@angular/forms';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { EMPTY, merge, Observable } from 'rxjs';
import { ControlErrorComponent } from '../../components/control-error.component';
import { ControlErrorsContainerDirective } from './control-errors-container.directive';
import { FormSubmitDirective } from './form-submit.directive';
import { FORM_ERRORS } from './form-errors';

@Directive({
  selector: '[formControl], [formControlName]'
})
export class ControlErrorsDirective {

  container: ViewContainerRef;
  submit$: Observable<Event>;
  ref: ComponentRef<ControlErrorComponent>;
  @Input() customErrors = {};

  constructor(private vcr: ViewContainerRef,
              private resolver: ComponentFactoryResolver,
              @Optional() controlErrorContainer: ControlErrorsContainerDirective,
              @Inject(FORM_ERRORS) private errors,
              @Optional() @Host() private form: FormSubmitDirective,
              private controlDir: NgControl) {
    this.container = controlErrorContainer ? controlErrorContainer.vcr : vcr;
    this.submit$ = this.form ? this.form.submit$ : EMPTY;
  }

  ngOnInit() {
    merge(
      this.submit$,
      this.control.statusChanges
    ).pipe(
      untilDestroyed(this)).subscribe((v) => {
      const controlErrors = this.control.errors;
      if (controlErrors) {
        const firstKey = Object.keys(controlErrors)[0];
        const getError = this.errors[firstKey];
        const text = this.customErrors[firstKey] || (getError ? getError(controlErrors[firstKey]) : '');
        this.setError(text);
      } else if (this.ref) {
        this.setError(null);
      }
    });
  }

  get control() {
    return this.controlDir.control;
  }

  setError(text: string) {
    if (!this.ref) {
      const factory = this.resolver.resolveComponentFactory(ControlErrorComponent);
      this.ref = this.container.createComponent(factory);
    }

    this.ref.instance.text = text;
  }

  ngOnDestroy() {
  }

}
