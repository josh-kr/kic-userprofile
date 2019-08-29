import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { queryPaginated, Page } from './pagination';


export interface Car {
  color: string;
  make: string;
  model: string;
  vin: string;
  year: string;
}



@Injectable({
  providedIn: 'root'
})
export class CarService {
  private baseUrl = '/api/cars';

  constructor(
    private http: HttpClient
  ) {
  }

  getCars() {

  }
  list(urlOrFilter?: string | object): Observable<Page<Car>> {
    return queryPaginated<Car>(this.http, this.baseUrl, urlOrFilter);
  }

}
