import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlErrorDirectivesModule } from './control-errors/control-error-directives.module';
import { InputIntegerDirective } from './input-integer/input-integer.directive';
import {AutoFocusDirective} from "./auto-focus/auto-focus.directive";
import {InputNumberDirective} from "./input-number/input-number.directive";

@NgModule({
  imports: [
    CommonModule,
    ControlErrorDirectivesModule
  ],
  declarations: [InputIntegerDirective, AutoFocusDirective, InputNumberDirective],
  exports: [InputIntegerDirective, AutoFocusDirective, InputNumberDirective],

})
export class DirectivesModule { }
