import { Component, OnInit, Input, Output, EventEmitter, ViewChild, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Dialog } from 'primeng/primeng';
import { Subject } from 'rxjs';
import { MySubscription } from '../../../../models/my-subscription';
import { DropdownComponent } from '@ers-component-lib/components';
import { FEATURE_TOGGLE } from '../../../../feature-toggle.constants';
import { LabelValue } from 'src/app/lib/models/label.value';
import { SubscriptionService } from 'src/app/lib/services/subscription.service';

@Component({
  selector: 'ngpp-subscription-modal',
  templateUrl: './subscription-modal.component.html',
  styleUrls: ['./subscription-modal.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class SubscriptionModalComponent implements OnInit, OnDestroy {

  @Input() showModal: boolean;

  @Input() mySubscription: MySubscription;

  @Output() modalClose: EventEmitter<boolean> = new EventEmitter();

  @Output() submitForm: EventEmitter<MySubscription> = new EventEmitter();

  @ViewChild(Dialog) dialog;
  @ViewChild('eventDropdown') eventDropdown: DropdownComponent;
  @ViewChild('frequencyDropdown') frequencyDropdown: DropdownComponent;
  @ViewChild('domainDropdown') domainDropdown: DropdownComponent;
  @ViewChild('notificationDropdown') notificationDropdown: DropdownComponent;

  destroy$ = new Subject<boolean>();

  public domainOptions: LabelValue[];
  public deliveryOptions: LabelValue[];
  public notificationTypeOptions: LabelValue[];
  public frequencyOptions: LabelValue[];
  public allFrequencyOptions: LabelValue[];
  public reducedFrequencyOptions: LabelValue[];
  public eventTypeOptions: LabelValue[];
  public reducedNotificationTypeOptions: LabelValue[];
  public allNotificationTypeOptions: LabelValue[];

  isEdit = false;
  isListCostDomain = false;
  showListCostDomain = FEATURE_TOGGLE.DISPLAY_LIST_COST;

  // Message Bar
  messageText: string;
  messageKind: string;
  showMessage = false;

  constructor(private subscriptionService: SubscriptionService) { }

  ngOnInit() {
    // load Event Types if this is an edit
    if (this.mySubscription.domain) {
      this.isEdit = true;
      this.getEventTypes();
    } else {
      this.isEdit = false;
      // default frequency to IMMEDIATE
      this.mySubscription.frequency = 'IMMEDIATE';
    }

    this.subscriptionService.getDomains().then(response => {
      this.domainOptions = response.data;

      if (!this.showListCostDomain) {
        this.domainOptions = this.domainOptions.filter(data => data.value !== 'List Cost Change');
      }
    }).catch((error) => {
      this.displayMessage('Error calling server', 'error');
    });

    this.getDeliveryTypes();

    this.subscriptionService.getFrequencies().then(response => {
      this.frequencyOptions = response.data;
      this.allFrequencyOptions = response.data;
      response.data.forEach(item => {
        console.log(item);
        if (item.value === 'DAILY') {
          this.reducedFrequencyOptions = [];
          this.reducedFrequencyOptions.push(item);
        }
      });
    }).catch((error) => {
      console.error(error);
      this.displayMessage('Error calling server', 'error');
    });

    this.subscriptionService.getNotificationTypes().then(response => {
      this.notificationTypeOptions = response.data;
      this.allNotificationTypeOptions = response.data;
      response.data.forEach(item => {
        console.log(item);
        if (item.value === 'ALERT' || item.value === 'ALERTS') {
          this.reducedNotificationTypeOptions = [];
          this.reducedNotificationTypeOptions.push(item);
        }
      });
    }).catch((error) => {
      this.displayMessage('Error calling server', 'error');
    });

    this.mySubscription.deliveryVehicleValues = [];
  }

  ngOnDestroy() {
    this.destroy$.next(true);
  }

  handleModalClose() {
    this.modalClose.emit();
  }

  onSubmit() {
    this.subscriptionService.saveSubscription(this.mySubscription).then((result) => {
      this.submitForm.emit(result);
      this.modalClose.emit();
    }).catch((error) => {
      this.displayMessage(error, 'error');
    });
  }

  onCancel() {
    this.modalClose.emit();
  }

  onEventSelectionChange(event: any) {
    try {
      console.log(event);
      if (event.indexOf('Ad Plan|Placed Promos put on Hold/Delete') >= 0) {
        this.frequencyOptions = this.reducedFrequencyOptions;
      } else {
        this.restoreFrequencyOptions();
      }
      if (event.indexOf('Ad Plan|Pages Added for Enterprise, Division and Version') >= 0
        || event.indexOf('Ad Plan|Placed Promos put on Hold/Delete') >= 0) {
        this.notificationTypeOptions = this.reducedNotificationTypeOptions;
      } else {
        this.restoreNotificationTypeOptions();
      }
    } catch (e) {
      console.error('hello', e);
    }
  }
  restoreFrequencyOptions() {
    this.frequencyDropdown.selectedItems = [];
    this.frequencyOptions = this.allFrequencyOptions;
  }
  restoreNotificationTypeOptions() {
    this.notificationDropdown.selectedItems = [];
    this.notificationTypeOptions = this.allNotificationTypeOptions;
  }

  onDomainChange(event) {
    if (event === 'List Cost Change') {
      this.isListCostDomain = true;
      this.mySubscription.deliveryVehicleValues = this.mySubscription.deliveryVehicleValues.length > 0 ?
        this.mySubscription.deliveryVehicleValues.filter(val => val === 'web')
        : this.mySubscription.deliveryVehicleValues;
    } else {
      this.isListCostDomain = false;
    }

    if (this.mySubscription.domain !== event) {
      this.mySubscription.eventTypeValues = [];
      this.getEventTypes();
    }
    this.getDeliveryTypes();
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
    return await new Promise<void>(resolve => setTimeout(() => resolve(), ms));
  }

  onDeliveryTypeSelected(selectedDeliveryType: string, isChecked: boolean) {

    if (this.mySubscription.deliveryVehicleValues.indexOf(selectedDeliveryType) === -1 && isChecked) {
      this.mySubscription.deliveryVehicleValues.push(selectedDeliveryType);
    } else if (this.mySubscription.deliveryVehicleValues.indexOf(selectedDeliveryType) !== -1 && !isChecked) {
      this.mySubscription.deliveryVehicleValues = this.mySubscription.deliveryVehicleValues.filter(val => val !== selectedDeliveryType);
    }
  }

  getDeliveryTypes(): void {
    this.subscriptionService.getDeliveryTypes().then(response => {
      this.deliveryOptions = response.data.filter(item => item.value === 'web');
    }).catch((error) => {
      this.displayMessage('Error calling server', 'error');
    });
  }
  getEventTypes(): void {
    this.subscriptionService.getEventTypes(this.mySubscription.domain).then(response => {
      this.eventTypeOptions = response.data;
    }).catch((error) => {
      this.displayMessage('Error calling server', 'error');
    });
  }
}
