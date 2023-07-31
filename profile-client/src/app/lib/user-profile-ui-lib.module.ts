import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserProfileUiLibRoutingModule } from './user-profile-ui-lib-routing.module';
import { KrogerNotificationsModule, KrogerNotificationsService } from 'kroger-notifications';
// import { AuthService, KrogerNgAuthModule } from 'kroger-ng-oauth2';
import { KdsStencilAccessorsModule } from 'kds-stencil-accessors';
// import { LoadingScreenInterceptor } from './services/loading-screen.interceptor';
import { UserProfileUiLibComponent } from './user-profile-ui-lib.component';
import { RouterModule } from '@angular/router';
// import { AuthGuard } from './guards/auth.guard';
import { UserProfileTabModule } from './user-profile-tab/user-profile-tab.module';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    UserProfileUiLibRoutingModule,
    UserProfileTabModule,
    KdsStencilAccessorsModule,
  ],
  // declarations: [
  //   UserProfileUiLibComponent,
  // ],


  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [],
  
  // bootstrap: [UserProfileUiLibComponent]

})
export class UserProfileUiLibModule { }
