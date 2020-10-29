import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { IvyCarouselModule } from 'angular-responsive-carousel';

@NgModule({
  declarations: [
    routingComponents
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'examen' }),
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    IvyCarouselModule
  ],
  providers: [],
  bootstrap: [routingComponents[0]]
})
export class AppModule { }
