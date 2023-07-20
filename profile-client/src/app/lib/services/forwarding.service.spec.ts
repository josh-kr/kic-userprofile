import { TestBed } from '@angular/core/testing';

import { ForwardingService } from './forwarding.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpTestingController } from '@angular/common/http/testing';

describe('ForwardingService', () => {
  // let httpClientSpy: { get: jasmine.Spy };
  // let forwardingService: ForwardingService;
  // let httpClient: HttpClient;
  // let httpTestingController: HttpTestingController;

  // beforeEach(() => {
  //   TestBed.configureTestingModule({
  //     imports: [HttpClientModule],
  //     providers: [HttpTestingController]
  //   });
  //   httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
  //   forwardingService = new ForwardingService(<any>httpClientSpy);

  //   httpClient = TestBed.get(HttpClient);
  //   httpTestingController = TestBed.get(HttpTestingController);
  // });

  // it('should be created', () => {
  //   const service: ForwardingService = TestBed.get(ForwardingService);
  //   expect(service).toBeTruthy();
  // });
});
