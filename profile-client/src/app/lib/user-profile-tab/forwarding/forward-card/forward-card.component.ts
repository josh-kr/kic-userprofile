import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ForwardUser } from '../../../models/forward-user';

@Component({
  selector: 'ngpp-forward-card',
  templateUrl: './forward-card.component.html',
  styleUrls: ['./forward-card.component.less']
})
export class ForwardCardComponent implements OnInit {

  @Input() forwardUser: ForwardUser;

  @Output()
  forwardUserEvent = new EventEmitter();

  @Output()
  forwardUserDeleteEvent = new EventEmitter();

  @Output()
  forwardUserUpdateEvent = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  editForwardUser() {
    this.forwardUserEvent.emit(this.forwardUser);
  }

  deleteForwardUser() {
    console.log('delete forward user');
    this.forwardUserDeleteEvent.emit(this.forwardUser);
  }

  updateForwardMessageFlagForUser() {
    this.forwardUser.forwardMessages = this.forwardUser.forwardMessages ? false : true;
    this.forwardUserUpdateEvent.emit(this.forwardUser);
  }
}
