import {
  Component, Input
} from '@angular/core';


@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html'
})
export class LoaderComponent {

  @Input() showLoadingIndicator = true;
  @Input() faIcon = 'fa-spinner';

}
