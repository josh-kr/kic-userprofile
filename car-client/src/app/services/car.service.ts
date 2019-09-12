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
  list(urlOrFilter?: string | object): Observable<Page> {
    return queryPaginated<Car>(this.http, this.baseUrl, urlOrFilter);
  }

  saveCar(car: Car): Observable<any> {
    console.log('save car', car);
    return this.http.post<Page>(this.baseUrl, car);
  }

  deleteCar(car: Car): Observable<any> {
    console.log('delete car', car);
    let params = new HttpParams();
        params = params.set('filter.vin', car.vin);
    return this.http.delete<Page>(this.baseUrl, { params: params });
  }

}
