import { Component, Input, ViewChild, Output, EventEmitter, OnDestroy, ViewEncapsulation, OnInit } from '@angular/core';
import { ForwardUser } from '../../../models/forward-user';
import { Dialog } from 'primeng/primeng';
import { Subject } from 'rxjs';
import { ForwardingService } from '../../../services/forwarding.service';
import { UserProfile } from '../../../models/user-profile';

@Component({
  selector: 'ngpp-forward-create-edit-modal',
  templateUrl: './forward-create-edit-modal.component.html',
  styleUrls: ['./forward-create-edit-modal.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class ForwardCreateEditModalComponent implements OnInit, OnDestroy {

  @Input()
  showModal: boolean;

  @Input() forwardUser: ForwardUser;

  @Input() userProfile: UserProfile;

  @Output()
  modalClose: EventEmitter<Boolean> = new EventEmitter();

  @Output()
  submitForm: EventEmitter<ForwardUser> = new EventEmitter();

  @ViewChild(Dialog) dialog;

  destroy$ = new Subject<boolean>();

  // search fields
  searchText = '';

  // Message Bar
  messageText: string;
  messageKind: string;
  showMessage = false;

  // Date fields
  startDate = new Date();
  startTime = new Date();
  endDate = new Date();
  endTime = new Date();

  public profiles = [];

  constructor(private forwardingService: ForwardingService) { }

  ngOnInit(): void {
    // default forward messages to true if not set (create)
    if (this.forwardUser.forwardMessagesAnytime === null) {
      this.forwardUser.forwardMessagesAnytime = true;
    }

    // default start and end date and times
    if (this.forwardUser.customStartDateTime !== undefined && this.forwardUser.customStartDateTime !== null) {
      this.startDate.setDate(this.forwardUser.customStartDateTime.getDate());
      this.startTime.setTime(this.forwardUser.customStartDateTime.getTime());
    }

    if (this.forwardUser.customEndDateTime !== undefined && this.forwardUser.customEndDateTime !== null) {
      this.endDate.setDate(this.forwardUser.customEndDateTime.getDate());
      this.endTime.setTime(this.forwardUser.customEndDateTime.getTime());
    }
  }

  ngOnDestroy() {
    this.destroy$.next(true);
  }

  handleModalClose() {
    this.modalClose.emit();
  }

  onSubmit() {
    // clear out date fields if user selects anytime
    if (this.forwardUser.forwardMessagesAnytime) {
      this.forwardUser.customStartDateTime = null;
      this.forwardUser.customEndDateTime = null;
    } else {
      this.forwardUser.customStartDateTime = this.combineDateWithTime(this.startDate, this.startTime);
      this.forwardUser.customEndDateTime = this.combineDateWithTime(this.endDate, this.endTime);
    }

    this.forwardingService.saveUserForward(this.userProfile.id, this.forwardUser).then(response => {
      this.submitForm.emit(response);
      this.modalClose.emit();
    }).catch((error) => {
      this.displayMessage('Invalid forward user!  The user must have a profile and also can only have one forward!', 'error');
    });
  }

  onCancel() {
    this.modalClose.emit();
  }

  handleSearchInputChange(event) {
    if (event.searchText !== undefined && event.searchText.length >= 3) {
      this.forwardingService.searchForUserProfiles(event.searchText).then(response => {
        this.profiles = response;
      });
    } else {
      this.profiles = [];
    }
  }

  onSelectUser(profile: any) {
    this.forwardUser.emailAddress = profile.emailAddress;
    this.forwardUser.profileId = profile.id;
    this.forwardUser.forwardUserId = profile.username;
    this.forwardUser.firstName = profile.firstName;
    this.forwardUser.lastName = profile.lastName;
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

  combineDateWithTime(d, t) {
    return new Date(Date.UTC(
      d.getFullYear(),
      d.getMonth(),
      d.getDate(),
      t.getHours(),
      t.getMinutes(),
      t.getSeconds(),
      t.getMilliseconds()
    ));
  }
}
