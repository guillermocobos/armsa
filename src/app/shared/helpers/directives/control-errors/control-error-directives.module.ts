import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ControlErrorComponent } from '../../components/control-error.component';
import { ControlErrorsContainerDirective } from './control-errors-container.directive';
import { ControlErrorsDirective } from './control-errors.directive';
import { FormSubmitDirective } from './form-submit.directive';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [ControlErrorComponent, ControlErrorsDirective, FormSubmitDirective, ControlErrorsContainerDirective],
  exports: [ControlErrorComponent, ControlErrorsDirective, FormSubmitDirective, ControlErrorsContainerDirective],
  entryComponents: [ControlErrorComponent]
})
export class ControlErrorDirectivesModule { }
