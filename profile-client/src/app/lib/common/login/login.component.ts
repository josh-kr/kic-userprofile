import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'kroger-ng-oauth2';

@Component({
  selector: 'ngpp-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router,  private authService: AuthService) {

    if (this.authService.getUser()) {
      this.router.navigate(['']);
  } else{
    this.authService.login()
  }
   }

  ngOnInit() {
  }

}
