import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private readonly toastController: any;

  constructor() {
    this.toastController = document.querySelector('#user-profile-toast-controller');
  }

  createToast(options: ToastOptions) {
    if (!this.toastController) {
      return;
    }
    this.toastController.createToast(options);
  }
}

export interface ToastOptions {
  heading?: string;
  kind: 'error' | 'info' | 'success' | 'warning';
  message?: string;
}
