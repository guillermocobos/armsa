import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[inputNumber]'
})


export class InputNumberDirective {

  @HostListener('keydown', ['$event'])
  public onInput(event) {
    const pattern = /^-?[0-9]\d*(\.\d+)?$/;
    const inputChar = event.key;
    const extraAllow = ['Backspace', 'Delete', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Tab', '.', '-'];
    if (!pattern.test(inputChar) && extraAllow.indexOf(inputChar) === -1) {
      event.preventDefault();
    }
  }
}
