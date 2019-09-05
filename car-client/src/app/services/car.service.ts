import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { queryPaginated } from './pagination';
import { Car, Page } from './models';


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

  saveCar(car: Car): Observable<any> {
    console.log('save car', car);
    return this.http.post(this.baseUrl, car);
  }

}
