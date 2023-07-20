import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MySubscription } from '../models/my-subscription';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  constructor(private http: HttpClient) { }

  getSubscriptions(profileId: number): Promise<any> {
    const response = this.http.get('/user-profile-api/v1/subscription?profileId=' + profileId).pipe(
      catchError(this.handleError)
    )
      .toPromise();
    return response;
  }

  saveSubscription(mySubscription: MySubscription): Promise<any> {
    return this.http.post('/user-profile-api/v1/subscription?profileId=' + mySubscription.profileId,
      mySubscription, httpOptions).pipe(
        catchError(this.handleError)
      ).toPromise();
  }

  async getDomains(): Promise<any> {
    const response = await this.http.get('/user-profile-api/v1/subscription/labels/notification-domains').pipe(
      catchError(this.handleError)
    )
      .toPromise();
    return response;
  }

  async getEventTypes(domain: string): Promise<any> {
    const response = await this.http.get('/user-profile-api/v1/subscription/labels/notification-event-types/' + domain).pipe(
      catchError(this.handleError)
    )
      .toPromise();
    return response;
  }

  async getNotificationTypes(): Promise<any> {
    const response = await this.http.get('/user-profile-api/v1/subscription/labels/notification-types').pipe(
      catchError(this.handleError)
    )
      .toPromise();
    return response;
  }

  async getFrequencies(): Promise<any> {
    const response = await this.http.get('/user-profile-api/v1/subscription/labels/notification-frequencies').pipe(
      catchError(this.handleError)
    )
      .toPromise();
    return response;
  }

  async getDeliveryTypes(): Promise<any> {
    const response = await this.http.get('/user-profile-api/v1/subscription/labels/notification-delivery-types').pipe(
      catchError(this.handleError)
    )
      .toPromise();
    return response;
  }

  deleteSubscription(id: number): Promise<any> {
    const url = '/user-profile-api/v1/subscription/' + id;
    const response = this.http.delete(url, httpOptions).pipe(
      catchError(this.handleError)
    ).toPromise();
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
