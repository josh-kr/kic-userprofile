import { Component, OnInit } from '@angular/core';
import { UserNotificationService } from '../../services/user-notification.service';
import { UserProfile } from '../../models/user-profile';
import { ProfileService } from '../../services/profile.service';
import { UserNotification } from '../../models/user-notification';

@Component({
  selector: 'ngpp-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.less']
})
export class NotificationsComponent implements OnInit {

  userProfile: UserProfile = new UserProfile();
  notifications: UserNotification[];
  showModal = false;

  twoDayNotifications: UserNotification[] = [];
  fiveDayNotifications: UserNotification[] = [];
  tenDayNotifications: UserNotification[] = [];

  // Message Bar
  messageText: string;
  messageKind: string;
  showMessage = false;

  constructor(private notificationService: UserNotificationService, private profileService: ProfileService) { }

  ngOnInit() {
    this.profileService.userProfile$.subscribe(userProfile => {
      this.userProfile = userProfile;
      this.loadNotifications();
    });
  }

  loadNotifications() {
    if (this.userProfile.id) {
      this.notificationService.getNotifications(this.userProfile.username).then(response => {
        this.notifications = response.data;
        this.sortByDate();
      });
    }
  }

  // There's probably a cleaner way to do this once..TODO revisit this.
  sortByDate() {
    const twoDays = new Date();
    twoDays.setDate(twoDays.getDate() - 2);

    const tenDays = new Date();
    tenDays.setDate(tenDays.getDate() - 10);

    this.twoDayNotifications = new Array();
    this.fiveDayNotifications = new Array();
    this.tenDayNotifications = new Array();

    this.notifications.forEach(notification => {
      const dueDate = new Date(notification.dueTime);

      if (dueDate.getDate() <= tenDays.getDate()) {
        this.tenDayNotifications.push(notification);
        return;
      } else if (dueDate.getDate() > tenDays.getDate() && dueDate.getDate() < twoDays.getDate()) {
        this.fiveDayNotifications.push(notification);
        return;
      } else {
        this.twoDayNotifications.push(notification);
      }

    });
  }

  onAcknowledgeNotification(userNotification: UserNotification) {
    this.notificationService.acknowledgeNotification(userNotification).then(response => {
      // remove event from notifcations list
      this.notifications = this.notifications.filter(item => item !== userNotification);
      // remove from sorted lists
      this.twoDayNotifications = this.twoDayNotifications.filter(item => item !== userNotification);
      this.fiveDayNotifications = this.fiveDayNotifications.filter(item => item !== userNotification);
      this.tenDayNotifications = this.tenDayNotifications.filter(item => item !== userNotification);
    }).catch((error) => {
      this.displayMessage(error, 'error');
    });
  }

  private displayMessage(text: string, kind: string, delayMillis?: number) {
    this.showMessage = true;
    this.messageText = text;
    this.messageKind = kind;
    if (delayMillis) {
      this.delay(delayMillis).then(any => {
        this.showMessage = false;
      });
    }
  }

  async delay(ms: number) {
    return await new Promise<void>(resolve => setTimeout(() => resolve(), ms));
  }

}
