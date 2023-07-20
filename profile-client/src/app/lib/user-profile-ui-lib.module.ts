import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserProfileUiLibRoutingModule } from './user-profile-ui-lib-routing.module';
import { KrogerNotificationsModule, KrogerNotificationsService } from 'kroger-notifications';
import { AuthService, KrogerNgAuthModule } from 'kroger-ng-oauth2';
import { KdsStencilAccessorsModule } from 'kds-stencil-accessors';
import { LoadingScreenInterceptor } from './services/loading-screen.interceptor';
import { UserProfileUiLibComponent } from './user-profile-ui-lib.component';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { UserProfileTabModule } from './components/user-profile-tab/user-profile-tab.module';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    KrogerNgAuthModule,
    UserProfileUiLibRoutingModule,
    UserProfileTabModule,
    KdsStencilAccessorsModule,
    KrogerNotificationsModule.forRoot(), // why do i have to import this here?
  ],
  declarations: [
    UserProfileUiLibComponent
  ],
  exports: [
    UserProfileUiLibComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    AuthService,
    AuthGuard,
    KrogerNotificationsService,
    { provide: HTTP_INTERCEPTORS, useClass: LoadingScreenInterceptor, multi: true }
  ],
  bootstrap: [UserProfileUiLibComponent]

})
export class UserProfileUiLibModule { }
