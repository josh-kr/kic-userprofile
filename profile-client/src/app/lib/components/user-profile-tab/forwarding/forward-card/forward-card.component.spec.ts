import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForwardCardComponent } from './forward-card.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ForwardUser } from '../../../../models/forward-user';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

describe('ForwardCardComponent', () => {
  let component: ForwardCardComponent;
  let fixture: ComponentFixture<ForwardCardComponent>;
  let httpClientSpy: { get: jasmine.Spy };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ForwardCardComponent],
      imports: [FormsModule, HttpClientModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);

    fixture = TestBed.createComponent(ForwardCardComponent);
    component = fixture.componentInstance;

    const forwardUser: ForwardUser = new ForwardUser();
    component.forwardUser = forwardUser;

    fixture.detectChanges();

    httpClientSpy.get.and.returnValue(forwardUser);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
