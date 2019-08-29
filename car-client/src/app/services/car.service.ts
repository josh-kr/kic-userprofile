import { Injectable } from '@angular/core';

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


  constructor() { }

  getCars() {

  }


}
