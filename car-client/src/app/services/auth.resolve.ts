import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService, User } from 'kroger-ng-oauth2';
import { NavService } from './nav.service';

@Injectable()
export class AuthResolve implements Resolve<any> {

  constructor(
    private authService: AuthService,
    private navService: NavService,
    private router: Router
    ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<any> {
    console.log('waiting');
    this.navService.setReturn(state.url);
    return this.authService.getUser() || this.router.navigate(['/country/countryList']);
  }
}
