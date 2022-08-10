import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { TruncateTextPipe } from './helpers/pipes/truncate-text.pipe';
import { LoadingButtonComponent } from './helpers/widgets/buttons/loading-button.component';
import { LoaderComponent } from './loader/loader.component';
import { LeftSidebarComponent } from './sidebar/left-sidebar.component';
import { RightSidebarComponent } from './sidebar/right-sidebar.component';
import {BlockuiTemplateComponent} from "./blockUI/blockui-template.component";
import {BlockUIModule} from "ng-block-ui";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    BlockUIModule.forRoot({
      message: 'Cargando...',
      template: BlockuiTemplateComponent
    })
  ],
  declarations: [
    LoaderComponent,
    HeaderComponent,
    LeftSidebarComponent,
    RightSidebarComponent,
    FooterComponent,
    LoadingButtonComponent,
    TruncateTextPipe,
    BlockuiTemplateComponent
  ],
  exports: [
    LoaderComponent,
    HeaderComponent,
    LeftSidebarComponent,
    RightSidebarComponent,
    FooterComponent,
    LoadingButtonComponent,
    TruncateTextPipe,
    BlockuiTemplateComponent
  ]
})
export class SharedModule { }
