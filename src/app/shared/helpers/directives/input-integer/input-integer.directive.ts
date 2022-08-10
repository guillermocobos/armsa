import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[inputInteger]'
})


export class InputIntegerDirective {

  @HostListener('keydown', ['$event'])
  public onInput(event) {
    const pattern = /[0-9]/;
    const inputChar = event.key;
    const extraAllow = ['Backspace', 'Delete', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Tab'];
    if (!pattern.test(inputChar) && extraAllow.indexOf(inputChar) === -1) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }
}
