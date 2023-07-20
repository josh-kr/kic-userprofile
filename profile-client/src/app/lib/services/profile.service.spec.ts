import { TestBed, async } from '@angular/core/testing';
import { ProfileService } from './profile.service';
import { HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthService } from 'kroger-ng-oauth2';
import { UserProfile } from '../models/user-profile';
import { Store } from '@ngrx/store';
import { of } from 'rxjs/internal/observable/of';
import { State } from 'kroger-ng-oauth2/lib/store/auth.store';

describe('ProfileService', () => {
  // let httpClient: HttpClient;
  // let httpTestingController: HttpTestingController;
  // let httpClientSpy: { get: jasmine.Spy };
  // let profileService: ProfileService;
  // let authService: AuthService;
  // tslint:disable-next-line:prefer-const
  // let store: Store<State>;

  // beforeEach(async(() => {
  //   TestBed.configureTestingModule({
  //     imports: [HttpClientModule],
  //     providers: [
  //       HttpTestingController,
  //       AuthService,
  //       { provide: Store, useValue: null }
  //     ]
  //   })
  //     .compileComponents();
  // }));

  // beforeEach(() => {
  //   TestBed.configureTestingModule({
  //     imports: [HttpClientModule],
  //     providers: [
  //       AuthService,
  //       { provide: Store, useValue: null }
  //     ]
  //   })
  //     .compileComponents();
  //   // TODO: spy on other methods too
  //   httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
  //   authService = new AuthService(store, <any>httpClientSpy);
  //   profileService = new ProfileService(<any>httpClientSpy, authService);

  //   httpClient = TestBed.get(HttpClient);
  //   httpTestingController = TestBed.get(HttpTestingController);
  // });

  // it('should be created', () => {
  //   const service: ProfileService = TestBed.get(ProfileService);
  //   expect(service).toBeTruthy();
  // });

  // it('should return user profile', () => {
  //   const userProfile: UserProfile = new UserProfile();
  //   userProfile.firstName = 'Jeff';
  //   userProfile.username = 'jc72451';

  //   httpClientSpy.get.and.returnValue(of(userProfile));

  //   profileService.getUserProfile().subscribe(response => {
  //     // tslint:disable-next-line:no-unused-expression
  //     expect(response).toEqual(userProfile, 'expected profile'), fail;
  //   });

  //   expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');

  // });

});
