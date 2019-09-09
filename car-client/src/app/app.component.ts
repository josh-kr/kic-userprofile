import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { KrogerNotificationsService, KrogerNotification } from 'kroger-notifications';
import { AuthService } from 'kroger-ng-oauth2';
import { NavService } from './services/nav.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  @ViewChild('mainBody') mainBody: ElementRef;
  private redirectURL: any;
  constructor(
    private authService: AuthService,
    private notify: KrogerNotificationsService,
    private router: Router,
    private navService: NavService,
    private userService: UserService
  ) {
    this.authService.auth.subscribe((data) => {
      if (this.navService.getReturn()) {
        this.redirectURL = this.navService.getReturn();
      } else {
        this.redirectURL = this.router.url;
      }
      if (data.authData.authenticated) {
        this.userService.user.next(data.authData.user);
        // User is signed in.
        if (this.redirectURL === '/' || this.redirectURL === '/login') {
          this.router.navigate(['/']);
        } else {
          this.router.navigate([this.redirectURL]);
        }
      } else {
        this.userService.user.next(null);
        // No user is signed in.
        this.router.navigate(['/']);
      }

      if (data.authData.error && data.authData.error.type === 'http_error') {
        this.notify.error(data.authData.error.status.toString(), data.authData.error.message);
      }
    });
  }
}
