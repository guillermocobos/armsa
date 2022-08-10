import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[controlErrorsContainer]'
})
export class ControlErrorsContainerDirective {
  constructor(public vcr: ViewContainerRef) { }
}
