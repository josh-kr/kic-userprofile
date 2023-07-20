import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileModule } from './profile/profile.module';
import { ForwardingModule } from './forwarding/forwarding.module';
import { SubscriptionsModule } from './subscriptions/subscriptions.module';
import { UserProfileTabComponent } from './user-profile-tab.component';
import { NotificationsModule } from './notifications/notifications.module';

@NgModule({
  imports: [
    CommonModule,
    ProfileModule,
    SubscriptionsModule,
    ForwardingModule,
    NotificationsModule
  ],
  declarations: [
    UserProfileTabComponent
  ],
  exports: [
    UserProfileTabComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UserProfileTabModule { }
