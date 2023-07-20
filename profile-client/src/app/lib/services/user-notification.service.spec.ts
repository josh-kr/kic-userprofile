import { TestBed } from '@angular/core/testing';

import { UserNotificationService } from './user-notification.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpTestingController } from '@angular/common/http/testing';

describe('UserNotificationService', () => {
  // let httpClientSpy: { get: jasmine.Spy };
  // let userNotificationService: UserNotificationService;
  // let httpClient: HttpClient;
  // let httpTestingController: HttpTestingController;

  // beforeEach(() => {
  //   TestBed.configureTestingModule({
  //     imports: [HttpClientModule],
  //     providers: [HttpTestingController]
  //   });
  //   httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
  //   userNotificationService = new UserNotificationService(<any>httpClientSpy);

  //   httpClient = TestBed.get(HttpClient);
  //   httpTestingController = TestBed.get(HttpTestingController);
  // });

  // it('should be created', () => {
  //   const service: UserNotificationService = TestBed.get(UserNotificationService);
  //   expect(service).toBeTruthy();
  // });
});
