import { Component, OnInit, ViewChild } from '@angular/core';
import { UserProfile } from '../../models/user-profile';
import { ForwardUser } from '../../models/forward-user';
import { ForwardCreateEditModalComponent } from './forward-create-edit-modal/forward-create-edit-modal.component';
import { ProfileService } from '../../services/profile.service';
import { ForwardingService } from '../../services/forwarding.service';

@Component({
  selector: 'ngpp-forwarding',
  templateUrl: './forwarding.component.html',
  styleUrls: ['./forwarding.component.less']

})
export class ForwardingComponent implements OnInit {

  userProfile: UserProfile = new UserProfile();
  forwardUsers: ForwardUser[] = [];
  selectedForwardUser: ForwardUser;
  showForwardModal = false;

  // Message Bar
  messageText: string;
  messageKind: string;
  showMessage = false;

  @ViewChild(ForwardCreateEditModalComponent) createEditModal: ForwardCreateEditModalComponent;

  constructor(private profileService: ProfileService, private forwardingService: ForwardingService) { }

  ngOnInit() {
    this.profileService.userProfile$.subscribe(userProfile => {
      this.userProfile = userProfile;
      this.getUserForwards();
    });
  }

  getUserForwards() {
    if (this.userProfile.id) {
      this.forwardingService.getUserForwards(this.userProfile.id).then(response => {
        this.forwardUsers = response;
      }, error => {
        console.error('ForwardingComponent -> getUserForwards', error);
      });
    }
  }

  createForward() {
    this.selectedForwardUser = new ForwardUser();
    this.showForwardModal = true;
  }

  editForward(user: ForwardUser) {
    this.selectedForwardUser = user;
    this.showForwardModal = true;

    // Tries to load string if this isn't done
    if (user.customStartDateTime !== null) {
      this.selectedForwardUser.customStartDateTime = new Date(user.customStartDateTime);
    }

    if (user.customEndDateTime !== null) {
      this.selectedForwardUser.customEndDateTime = new Date(user.customEndDateTime);
    }
  }

  onForwardFormSubmit(forwardUser: ForwardUser) {
    if (!this.forwardUsers.some((fUser) => fUser.id === forwardUser.id)) {
      this.forwardUsers.push(forwardUser);
    }
  }

  onForwardFormCardDelete(forwardUser: ForwardUser) {
    this.forwardingService.deleteUserForward(forwardUser.id).then(response => {
      // remove the forward user card
      this.forwardUsers = this.forwardUsers.filter(item => item !== forwardUser);
    });
  }

  handleForwardModalClose() {
    this.showForwardModal = false;
  }

  onForwardUserUpdate(forwardUser: ForwardUser) {
    this.forwardingService.saveUserForward(this.userProfile.id, forwardUser).then(response => {
      this.displayMessage('Forward User Updated!', 'success', 5000);
    });
  }

  // TODO: should this be here or on the user's profile page???? I think users profile
  // updateProfileUserForwardFlag() {
  //   this.userProfile.forwardMessages = this.userProfile.forwardMessages ? false : true;
  // }

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
