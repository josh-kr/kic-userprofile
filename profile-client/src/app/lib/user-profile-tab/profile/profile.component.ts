import { Component, OnInit, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { UserProfile } from '../../models/user-profile';
import { SelectItem } from 'primeng/api';
import { ProfileService } from '../../services/profile.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'ngpp-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class ProfileComponent implements OnInit {
  @Output() userUpdated = new EventEmitter();
  userProfile: UserProfile = new UserProfile();
  roles: any;

  // Message Bar
  messageText: string;
  messageKind: string;
  showMessage = false;

  public imgURL: any;
  public phoneProviders$: Observable<SelectItem[]>;

  constructor(private profileService: ProfileService, public sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.loadUser();
    this.roles = this.profileService.getUserRoles();
    this.phoneProviders$ = this.profileService.getPhoneProviders();
  }

  onSubmit() {
    this.profileService.saveUserProfile(this.userProfile).then(result => {
      this.userProfile = result;
      this.userUpdated.emit(this.userProfile);
      this.displayMessage('Profile has been saved!', 'success', 5000);
    }).catch((error) => {
      this.displayMessage(error, 'error');
    });
  }

  onCancel() {
    this.loadUser();
  }

  loadUser() {
    this.profileService.getUserProfile().subscribe(userProfile => {
      if (!userProfile.username) {
        this.userProfile = new UserProfile();
      }
      this.userProfile = userProfile;
      this.imgURL = userProfile.avatar;
    });
  }

  preview(files) {
    if (files.length === 0) {
      return;
    }

    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.displayMessage('Only images are supported.', 'error');
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (e) => {
      this.imgURL = reader.result;

      // set new avatar URL
      this.userProfile.avatar = this.imgURL;
    };
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
