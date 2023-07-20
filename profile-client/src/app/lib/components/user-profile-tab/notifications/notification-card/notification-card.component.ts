import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { UserNotification } from 'src/app/lib/models/user-notification';

@Component({
  selector: 'ngpp-notification-card',
  templateUrl: './notification-card.component.html',
  styleUrls: ['./notification-card.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class NotificationCardComponent implements OnInit {

  @Input() userNotification: UserNotification;

  @Output()
  userNotificationAcknowledgeEvent = new EventEmitter();

  @Output()
  userNotificationDeleteEvent = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  acknowledgeNotification() {
    console.log('acknowledgeNotification');
    this.userNotificationAcknowledgeEvent.emit(this.userNotification);
  }

}
