import { Component } from '@angular/core';

@Component({
  selector: 'app-block-template',
  styles: [`
    :host {
      text-align: center;
      color: #fff;
    }
  `],
  template: `
    <div class="block-ui-template">
      <div class="m-t-30 m-b-30">
        <p><i class="fas fa-pulse fa-spinner m-r-5"></i> <strong>{{message}}</strong></p>
      </div>

    </div>
  `
})
export class BlockuiTemplateComponent {
  message: any;
}
