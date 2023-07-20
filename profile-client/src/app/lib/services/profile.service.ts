import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserProfile } from '../models/user-profile';
import { AuthService } from 'kroger-ng-oauth2';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private userProfile: BehaviorSubject<UserProfile>;
  public userProfile$: Observable<UserProfile>;

  private userHasBeenFetched = false;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.userProfile = new BehaviorSubject<UserProfile>(new UserProfile());
    this.userProfile$ = this.userProfile.asObservable();
  }

  getUserProfile() {
    if (!this.userHasBeenFetched) {
      return this.fetchUserProfile();
    }
    this.userHasBeenFetched = true;
    return this.userProfile$;
  }

  getCurrentUserName(): string {
    return this.authService.getUser().username;
  }

  getUserRoles(): string {
    return this.authService.getUser().roles;
  }

  private fetchUserProfile(): Observable<UserProfile> {
    const url = '/user-profile-api/v1/profile/' + this.authService.getUser().username;
    return this.http.get(url).pipe(map((response: any) => {
      // if (response) {  // todo error check
      // }
      this.userProfile.next(response);
      return response;
    }));
  }

  saveUserProfile(userProfile: UserProfile): Promise<UserProfile> {
    const user = this.authService.getUser();
    userProfile.emailAddress = user.emailAddress;
    userProfile.username = user.username;
    return this.http.post('/user-profile-api/v1/profile', userProfile, httpOptions)
      .pipe(
        map((response: any) => {
          if (response) {
            this.userProfile.next(response);
          }
          return response;
        }),
        catchError(this.handleError)
      ).toPromise();
  }

  getPhoneProviders(): Observable<any> {
    const url = '/user-profile-api/v1/profile/labels/cell-phone-providers';
    return this.http.get(url).pipe(
      catchError(this.handleError)
    );
  }

  getUserAvatar(euid: string): Observable<any> {
    const url = '/user-profile-api/v1/profile/' + euid + '/avatar';
    return this.http.get(url).pipe(catchError(this.handleError));
  }

  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = error.error.message;
    } else {
      // server-side error
      errorMessage = error.message;
    }
    return throwError(errorMessage);
  }
}
