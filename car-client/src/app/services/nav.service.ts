import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavService {
  public returnURL: string;
  constructor() { }

  setReturn(url: string) {
    this.returnURL = url;
    return this.returnURL;
  }

  getReturn() {
    if (this.returnURL) {
      return this.returnURL;
    } else {
      return false;
    }
  }
}
