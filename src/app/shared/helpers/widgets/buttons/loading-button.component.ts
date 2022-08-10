import {
  Component, EventEmitter, Input, Output
} from '@angular/core';


@Component({
  selector: 'app-loading-button',
  templateUrl: './loading-button.component.html'
})
export class LoadingButtonComponent {

  @Input() disabled = false;
  @Input() loading = false;
  @Input() title;
  @Input() type = 'submit';
  @Input() hasIcon = false;
  @Input() materialIcon: string;
  @Input() additionalClass: string;
  @Input() buttonColor = 'primary';
  @Input() marginTop = 'm-t-15';
  @Input() replaceLoading = false;
  @Input() customClassColor;

  @Output() clickButton = new EventEmitter();

  onClickButton() {
    this.clickButton.emit();
  }

}
