import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SubscriptionsComponent } from './subscriptions.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { SubscriptionService } from '../../services/subscription.service';
import { ProfileService } from '../../services/profile.service';
import { AuthService } from 'kroger-ng-oauth2';
import { Store } from '@ngrx/store';

describe('SubscriptionsComponent', () => {
  let component: SubscriptionsComponent;
  let fixture: ComponentFixture<SubscriptionsComponent>;
  let httpClientSpy: { get: jasmine.Spy };

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    TestBed.configureTestingModule({
      declarations: [SubscriptionsComponent],
      imports: [
        HttpClientModule
      ],
      providers: [
        SubscriptionService,
        ProfileService,
        AuthService,
        { provide: Store, useValue: null }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
    fixture = TestBed.createComponent(SubscriptionsComponent);
    component = fixture.componentInstance;

    // const subscription: MySubscription = new MySubscription();
    // subscription.eventTypeValues = [];
    // component.mySubscription = subscription;

    fixture.detectChanges();

    // httpClientSpy.get.and.returnValue(subscription);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
