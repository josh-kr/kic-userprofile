import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { KrogerNotificationsModule, KrogerNotificationsService } from 'kroger-notifications';
import { CoreModule } from './core/core.module';
import { HomeModule } from './home/home.module';
import { PagesModule } from './pages/pages.module';
import { KdsStencilAccessorsModule } from 'kds-stencil-accessors';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    AppRoutingModule,
    RouterModule,
    KrogerNotificationsModule.forRoot(),
    CoreModule,
    HomeModule,
    PagesModule,
    KdsStencilAccessorsModule
  ],
  providers: [KrogerNotificationsService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class AppModule { }
