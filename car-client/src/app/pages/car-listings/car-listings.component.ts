import { Component, OnInit } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { debounceTime, merge, share, startWith, switchMap } from 'rxjs/operators';
import { Page } from '../../services/pagination';
import { CarService, Car } from '../../services/car.service';


export interface Filter {
  page: {
    offset: any;
    size: any;
  };
  projections?: string;
  sort?: string;
  filter?: {
    make: string;
    vin: string;
  };
}


@Component({
  selector: 'app-car-listings',
  templateUrl: './car-listings.component.html',
  styleUrls: ['./car-listings.component.less']
})
export class CarListingsComponent implements OnInit {

  public paginatorOptions = {
    displayPaginator: true,
    itemsPerPageDropdown: true,
    itemsPerPage: 10,
    displayTotalItems: 'both',
    displayItemsPerPage: 'both',
    itemsPerPageList: null,
  };

  public first = 0;
  public currentPage = 1;
  public sortMeta: any = {};

  public page: Observable<Page<Car>>;
  public pageUrl = new Subject<string>();

  public filter: BehaviorSubject<Filter> = new BehaviorSubject({
    page: {
      offset: 0,
      size: this.paginatorOptions.itemsPerPage,
    }
  });


  constructor(
    private carService: CarService
  ) {
    this.page = this.filter.asObservable().pipe(
      debounceTime(200),
      startWith(this.filter.value),
      merge(this.pageUrl),
      switchMap(urlOrFilter => this.carService.list(urlOrFilter)),
      share()
    );

  }

  ngOnInit() {
  }


  deleteCar(car) {

  }

  _handlePageChange(event) {
    this.currentPage = event.currentPage;
    this.paginatorOptions.itemsPerPage = event.itemsPerPage;
    this.first = (this.currentPage - 1) * this.paginatorOptions.itemsPerPage;
  }
  _isFieldSorted(field) {
    return this.sortMeta.field === field;
  }
  _isAscendingSortOrder(field) {
    if (this.sortMeta.field === field && this.sortMeta.order === 1) {
      return true;
    }
    if (this.sortMeta.field === field && this.sortMeta.order === 0) {
      return false;
    }
  }
  _sortHandler(event) {
    this.sortMeta = event;
  }
}
