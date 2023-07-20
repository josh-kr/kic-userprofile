import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { MySubscription } from '../../../../models/my-subscription';

@Component({
  selector: 'ngpp-subscription-card',
  templateUrl: './subscription-card.component.html',
  styleUrls: ['./subscription-card.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class SubscriptionCardComponent implements OnInit {

  @Input() mySubscription: MySubscription;

  @Output() subscriptionEvent: EventEmitter<MySubscription> = new EventEmitter();
  @Output() subscriptionDeleteEvent: EventEmitter<MySubscription> = new EventEmitter();
  @Output() subscriptionUpdateEvent: EventEmitter<MySubscription> = new EventEmitter();

  constructor() { }

  ngOnInit() { }

  editSubscription() {
    this.subscriptionEvent.emit(this.mySubscription);
  }

  deleteSubscription() {
    this.subscriptionDeleteEvent.emit(this.mySubscription);
  }

  updateSubscriptionDisturbFlag() {
    this.mySubscription.doNotDisturb = this.mySubscription.doNotDisturb ? false : true;
    this.subscriptionUpdateEvent.emit(this.mySubscription);
  }

}
