import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationsComponent } from './notifications.component';
import { UserNotificationService } from '../../services/user-notification.service';
import { NotificationCardComponent } from './notification-card/notification-card.component';
import { OrderByPipe } from '../../pipes/order-by.pipe';
import { CardModule } from 'primeng/card';

@NgModule({
  declarations: [
    NotificationsComponent,
    NotificationCardComponent,
    OrderByPipe
  ],
  imports: [
    CommonModule,
    CardModule
  ],
  providers: [
    UserNotificationService
  ],
  exports: [NotificationsComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [
    NotificationsComponent
  ],
})
export class NotificationsModule { }
