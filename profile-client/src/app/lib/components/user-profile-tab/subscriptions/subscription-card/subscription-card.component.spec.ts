import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionCardComponent } from './subscription-card.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SplitLastPipe } from '../../../../pipes/split-last.pipe';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SubscriptionService } from '../../../../services/subscription.service';
import { MySubscription } from '../../../../models/my-subscription';

describe('SubscriptionCardComponent', () => {
  let component: SubscriptionCardComponent;
  let fixture: ComponentFixture<SubscriptionCardComponent>;
  let httpClientSpy: { get: jasmine.Spy };

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    TestBed.configureTestingModule({
      declarations: [
        SubscriptionCardComponent,
        SplitLastPipe
      ],
      imports: [FormsModule, HttpClientModule],
      providers: [
        SubscriptionService
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
    fixture = TestBed.createComponent(SubscriptionCardComponent);
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
});
