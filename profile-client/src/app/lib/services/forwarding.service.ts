import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserProfile } from '../models/user-profile';
import { ForwardUser } from '../models/forward-user';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ForwardingService {

  constructor(private http: HttpClient) { }

  getUserForwards(profileId: number): Promise<ForwardUser[]> {
    const url = '/user-profile-api/v1/forwarding?profileId=' + profileId;
    return this.http.get(url).pipe(map((response: any) => {
      if (response) {
        // do something
      }
      return response;
    })).toPromise();
  }

  saveUserForward(profileId: number, forwardUser: ForwardUser): Promise<any> {
    const url = '/user-profile-api/v1/forwarding?profileId=' + profileId;
    const response = this.http.post(url,
      forwardUser, httpOptions).pipe(
        catchError(this.handleError)
      ).toPromise();
    return response;
  }

  searchForUserProfiles(lastName: string): Promise<UserProfile[]> {
    const url = '/user-profile-api/v1/api/profile?filter.lastName.like=' + lastName;
    return this.http.get(url).pipe(map((response: any) => {
      return response.data;
    })).toPromise();
  }

  deleteUserForward(id: number): Promise<any> {
    const url = '/user-profile-api/v1/forwarding/' + id;
    const response = this.http.delete(url, httpOptions).toPromise();
    return response;
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

