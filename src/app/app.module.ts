import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { NgBoostedModule } from 'ng-boosted';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AppConfig } from './shared/app.config';
import {LoadStaticDataGuards} from './shared/guards/load-static-data.guard';
import {LoadStaticDataService} from './shared/service/load-static-data.service';
import {DatePipe} from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSliderModule, MatTableModule} from '@angular/material';
import {TeamService} from './main/modules/management/shared/services/team.service';
import {SharedModule} from './shared/shared.module';
import {TokenInterceptorService} from './shared/http-interceptors/auth-interceptor.service';

const initConf = (appConfig: AppConfig) => {
  return () => {
    return appConfig.load();
  };
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    MatSliderModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgBoostedModule,
    BrowserAnimationsModule,
    SharedModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }, DatePipe, LoadStaticDataService, LoadStaticDataGuards, AppConfig, { provide: APP_INITIALIZER, useFactory: initConf, deps: [AppConfig], multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
