import { Component } from '@angular/core';
import { AuthService } from 'kroger-ng-oauth2';
import { KrogerNotificationsService } from 'kroger-notifications';
import { IMenuData } from './lib/models/menu';
import { Router } from '@angular/router';
/* tslint:disable:no-string-literal */


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  baseUrl = '';
  authConfig = {
    baseUrl: this.baseUrl,
    meEndpoint: this.baseUrl + '/api/me',
    logoutUrl: this.baseUrl + '/oauth/logout',
    gatewayUrl: this.baseUrl
  };
  public hideMenu = true;
  public menuData: IMenuData[];
  title = 'user-profile-ui-decouple-poc';

  constructor(
    private authService: AuthService,
    private notify: KrogerNotificationsService,
    public router: Router
  ) {
    this.menuData = [
      { label: 'Profile', link: 'profile', shouldHide: this.hideMenu },
      { label: 'My Subscriptions', link: 'subscriptions', shouldHide: this.hideMenu },
      { label: 'Log out', link: 'sign-out', shouldHide: this.hideMenu },
      { label: 'Log In', link: 'sign-in', shouldHide: this.hideMenu }
    ];
    this.authService.auth.subscribe((data) => {
      console.log('Auth Subscription from state manager', data);
      if (data.authData.error && data.authData.error.type === 'http_error') {
        this.notify.error(data.authData.error.status.toString(), data.authData.error.message);
      }
    });
  }

  logoClick() {
    this.router.navigate(['/']);
  }
  titleClick() {
    this.router.navigate(['/']);
  }
  menuItemClick(event?: any) {
    console.log('menu item click', event);

    if (event['detail']['link'] === 'sign-in') {
      this.authService.login();
    } else {
      this.router.navigate([event['detail']['link']]);
    }
  }
  login() {
    this.authService.login()
  }

}
