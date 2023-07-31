import { HttpClient, HttpBackend } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LogoutService {
  constructor(private readonly httpClient: HttpClient) {
   
  }
  doLogout(): Observable<any> {
    const url = window.location.origin + '/oauth/logout';
    return this.httpClient.get<any>(url).pipe(
      map(response => {
        return response;
      })
    );
  }
}
