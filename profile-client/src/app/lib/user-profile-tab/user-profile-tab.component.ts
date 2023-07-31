import { Component, OnInit, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { LoadingScreenService } from '../services/loading-screen.service';
import { startWith, delay } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { IMenuData } from '../models/menu';
import { LogoutService } from '../services/logout.service';

@Component({
  selector: 'ngpp-user-profile-tab',
  templateUrl: './user-profile-tab.component.html',
  styleUrls: ['./user-profile-tab.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class UserProfileTabComponent implements AfterViewInit, OnInit {

  loadingSubscription: Subscription;
  public loading = false;
  public hideMenu = true;
  public menuData: IMenuData[];
  constructor(private loadingScreenService: LoadingScreenService,
              private router: Router,
              private logoutService:LogoutService,
              ) { 

                this.menuData = [
                  // { label: 'Profile', link: "profile", shouldHide: this.hideMenu },
                  // { label: 'My Subscriptions', link: "subscriptions", shouldHide: this.hideMenu },
                  { label: 'Log out', link: "sign-out", shouldHide: this.hideMenu },
                  // { label: 'Log In', link: "login", shouldHide: this.hideMenu }
                ];
              }

  ngOnInit() {
    this.loadingSubscription = this.loadingScreenService.loadingStatus
      .pipe(
        startWith(<string>null),
        delay(0)
      )
      .subscribe(
        (status: boolean) => {
          this.loading = status;
        },
        err => {
          this.loading = false;
        });
  }


  ngAfterViewInit() {

  }
  


  logoClick() {
    this.router.navigate(['/']);
  }
  titleClick() {
    this.router.navigate(['/']);
  }
  menuItemClick(event?: any) {
    // console.log('menu item click', event);
    
    if(event['detail']['link'] === 'sign-out') {
      this.logout();
    } 
    // else {
    //   this.router.navigate([event['detail']['link']]);
    // }

  }

  windowRefresh = () => {
   window.location.reload();
  };
  logout() {
    this.logoutService.doLogout().subscribe(
      () => {
        this.windowRefresh();
      },
      () => {
        this.windowRefresh();
      }
    );
  }
}

