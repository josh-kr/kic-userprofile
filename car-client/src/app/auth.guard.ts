import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'kroger-ng-oauth2';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    console.log('guard');
    if (this.authService.getUser()) {
      console.log('guard,  true');
      return true;
    }
    // Not logged in so redirect to login page or starting-page with the return url
    console.log('guard,  false');
    return false;
  }
}
