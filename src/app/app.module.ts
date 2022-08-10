import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BlockUIModule } from 'ng-block-ui';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { AuthGuard } from './authentication/auth.guard';
import { AuthenticationService } from './authentication/signin/authentication.service';
import { TokenInterceptor } from './authentication/token.interceptor';
import { DynamicScriptLoaderService } from './dynamic-script-loader-service.service';
import {SharedModule} from './shared/shared.module';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";




@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule
  ],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }, DynamicScriptLoaderService, {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }, AuthenticationService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
