import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForwardingComponent } from './forwarding.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpTestingController } from '@angular/common/http/testing';
import { ForwardingService } from '../../services/forwarding.service';
import { ProfileService } from '../../services/profile.service';
import { AuthService } from 'kroger-ng-oauth2';
import { Store } from '@ngrx/store';

describe('ForwardingComponent', () => {
  let component: ForwardingComponent;
  let fixture: ComponentFixture<ForwardingComponent>;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ForwardingComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [HttpClientModule],
      providers: [
        ProfileService,
        ForwardingService,
        AuthService,
        { provide: Store, useValue: null },
        HttpTestingController
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForwardingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
