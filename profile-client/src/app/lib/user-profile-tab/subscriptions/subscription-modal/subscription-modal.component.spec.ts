import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionModalComponent } from './subscription-modal.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MySubscription } from 'projects/user-profile-ui-lib/src/lib/models/my-subscription';
import { HttpClientModule } from '@angular/common/http';
import { SubscriptionService } from 'projects/user-profile-ui-lib/src/lib/services/subscription.service';

describe('SubscriptionModalComponent', () => {
  let component: SubscriptionModalComponent;
  let fixture: ComponentFixture<SubscriptionModalComponent>;
  let httpClientSpy: { get: jasmine.Spy };

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    TestBed.configureTestingModule({
      declarations: [SubscriptionModalComponent],
      imports: [FormsModule, HttpClientModule],
      providers: [
        SubscriptionService
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
    fixture = TestBed.createComponent(SubscriptionModalComponent);
    component = fixture.componentInstance;

    const subscription: MySubscription = new MySubscription();
    subscription.eventTypeValues = [];
    component.mySubscription = subscription;

    fixture.detectChanges();

    httpClientSpy.get.and.returnValue(subscription);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add deliveryVehicleValues on checking delivery method', () => {
    component.onDeliveryTypeSelected('sms', true);
    expect(component.mySubscription.deliveryVehicleValues).toEqual(['sms']);
  });

  it('should remove deliveryVehicleValues on checking delivery method', () => {
    component.mySubscription.deliveryVehicleValues = ['sms'];
    component.onDeliveryTypeSelected('sms', false);
    expect(component.mySubscription.deliveryVehicleValues).toEqual([]);
  });
});
