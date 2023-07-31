import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthService, KrogerNgAuthModule } from 'kroger-ng-oauth2';
import { AuthGuard } from './lib/guards/auth.guard';
import { KrogerNotificationsService } from 'kroger-notifications';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoadingScreenInterceptor } from './lib/services/loading-screen.interceptor';
import { LoginComponent } from './lib/common/login/login.component';
import { Error404pageComponent } from './lib/common/error404page/error404page.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    Error404pageComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    KrogerNgAuthModule,

  ],
  providers: [
    AuthService,
    AuthGuard,
    KrogerNotificationsService,
    { provide: HTTP_INTERCEPTORS, useClass: LoadingScreenInterceptor, multi: true },
    { provide: 'Window', useValue: window }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { 

}
