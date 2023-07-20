import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { UserNotification } from '../models/user-notification';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class UserNotificationService {

  constructor(private http: HttpClient) { }

  getNotifications(euid: string): Promise<any> {
    const url = '/user-profile-api/v1/notifications?euid=' + euid;
    return this.http.get(url).pipe(map((response: any) => {
      if (response) {
        // do something
      }
      return response;
    }), catchError(this.handleError)).toPromise();
  }

  acknowledgeNotification(userNotification: UserNotification): Promise<any> {
    const url = '/user-profile-api/v1/notification?id=' + userNotification.id + '&status=7'; // 7 = acknowledged
    return this.http.post(url, httpOptions).pipe(
      catchError(this.handleError)
    ).toPromise();
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
