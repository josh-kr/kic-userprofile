import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForwardCreateEditModalComponent } from './forward-create-edit-modal.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ForwardUser } from 'projects/user-profile-ui-lib/src/lib/models/forward-user';

describe('ForwardCreateEditModalComponent', () => {
  let component: ForwardCreateEditModalComponent;
  let fixture: ComponentFixture<ForwardCreateEditModalComponent>;
  let httpClientSpy: { get: jasmine.Spy };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ForwardCreateEditModalComponent],
      imports: [FormsModule, HttpClientModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);

    fixture = TestBed.createComponent(ForwardCreateEditModalComponent);
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
