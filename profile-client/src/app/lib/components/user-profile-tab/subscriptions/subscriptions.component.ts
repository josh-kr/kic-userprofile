import { Component, OnInit } from '@angular/core';
import { MySubscription } from '../../../models/my-subscription';
import { SubscriptionService } from '../../../services/subscription.service';
import { UserProfile } from '../../../models/user-profile';
import { ProfileService } from '../../../services/profile.service';

@Component({
  selector: 'ngpp-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.less']
})
export class SubscriptionsComponent implements OnInit {

  selectedSubscription: MySubscription;
  showSubscriptionModal = false;
  subscriptions: MySubscription[];
  userProfile: UserProfile = new UserProfile();

  // Message Bar
  messageText: string;
  messageKind: string;
  showMessage = false;

  constructor(private subscriptionService: SubscriptionService, private profileService: ProfileService) {

  }

  ngOnInit() {
    this.profileService.userProfile$.subscribe(userProfile => {
      this.userProfile = userProfile;
      this.loadSubscriptions();
    });
  }

  loadSubscriptions() {
    if (this.userProfile.id) {
      this.subscriptionService.getSubscriptions(this.userProfile.id).then(response => {
        this.subscriptions = response;
      });
    }
  }

  addSubscritpion() {
    this.selectedSubscription = new MySubscription();
    // need the user's profile id to tie it to the data model
    this.selectedSubscription.profileId = this.userProfile.id;
    this.showSubscriptionModal = true;
  }

  handleSubscriptionModalClose() {
    this.showSubscriptionModal = false;
  }

  onSubscriptionModalSubmit(mySubscription: MySubscription) {
    if (!this.subscriptions.some((subscription) => subscription.id === mySubscription.id)) {
      this.subscriptions.push(mySubscription);
    }
    this.displayMessage('Subscription Updated!', 'success', 5000);
  }

  onEditSubscription(mySubscription: MySubscription) {
    this.selectedSubscription = mySubscription;
    this.selectedSubscription.profileId = this.userProfile.id;
    this.showSubscriptionModal = true;
  }

  onDeleteSubscription(mySubscription: MySubscription) {
    this.subscriptionService.deleteSubscription(mySubscription.id);
    this.subscriptions = this.subscriptions.filter(item => item !== mySubscription);
  }

  onUpdateSubscription(mySubscription: MySubscription) {
    mySubscription.profileId = this.userProfile.id;
    this.subscriptionService.saveSubscription(mySubscription).then((result) => {
      this.displayMessage('Subscription Updated!', 'success', 5000);
    });
  }

  private displayMessage(text: string, kind: string, delayMillis?: number) {
    this.showMessage = true;
    this.messageText = text;
    this.messageKind = kind;
    if (delayMillis) {
      this.delay(delayMillis).then((response) => {
        this.showMessage = false;
      });
    }
  }

  async delay(ms: number) {
    return await new Promise(resolve => setTimeout(() => resolve(), ms));
  }

}
