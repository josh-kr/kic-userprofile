import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable({
  providedIn: 'root'
})
export class LoadingScreenService {

  loadingStatus: Subject<boolean> = new Subject();
  constructor() {
    this.loading = false;
  }
  get loading(): boolean {
    return this.loading;
  }

  set loading(value) {
    this.loading = value;
    this.loadingStatus.next(value);
  }

  startLoading() {
    this.loading = true;
  }

  stopLoading() {
    this.loading = false;
  }
}
