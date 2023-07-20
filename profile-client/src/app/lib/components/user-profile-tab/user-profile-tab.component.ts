import { Component, OnInit, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { LoadingScreenService } from '../../services/loading-screen.service';
import { startWith, delay } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'ngpp-user-profile-tab',
  templateUrl: './user-profile-tab.component.html',
  styleUrls: ['./user-profile-tab.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class UserProfileTabComponent implements AfterViewInit, OnInit {

  loadingSubscription: Subscription;
  public loading = false;

  constructor(
    private loadingScreenService: LoadingScreenService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    /* TODO REFACTOR:
    startWith is deprecated: use {@link scheduled} and {@link concatAll}
    (e.g. `scheduled([[a, b, c], source], scheduler).pipe(concatAll())`)
    */
    // this.loadingSubscription = this.loadingScreenService.loadingStatus
    //   .pipe(
    //     startWith(null), /* TODO Linting needed me to take out <string>null from this line*/
    //     delay(0)
    //   )
    //   .subscribe(
    //     (status: boolean) => {
    //       this.loading = status;
    //     },
    //     err => {
    //       this.loading = false;
    //     });
  }

  ngAfterViewInit() {

  }

}

