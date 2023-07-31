import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationCardComponent } from './notification-card.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { UserNotification } from '../../../models/user-notification';

describe('NotificationCardComponent', () => {
  let component: NotificationCardComponent;
  let fixture: ComponentFixture<NotificationCardComponent>;
  let httpClientSpy: { get: jasmine.Spy };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NotificationCardComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);

    fixture = TestBed.createComponent(NotificationCardComponent);
    component = fixture.componentInstance;

    const userNotification: UserNotification = new UserNotification();
    component.userNotification = userNotification;

    fixture.detectChanges();

    httpClientSpy.get.and.returnValue(userNotification);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
