import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { debounceTime, merge, share, startWith, switchMap } from 'rxjs/operators';
import { Page, Car, Filter } from '../../services/models';
import { CarService } from '../../services/car.service';
import * as XLSX from 'xlsx';
import { FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';

@Component({
  selector: 'app-car-listings',
  templateUrl: './car-listings.component.html',
  styleUrls: ['./car-listings.component.less']
})
export class CarListingsComponent implements OnInit {

  public paginatorOptions = {
    displayPaginator: true,
    itemsPerPageDropdown: true,
    itemsPerPage: 1,
    displayTotalItems: 'both',
    displayItemsPerPage: 'both',
    itemsPerPageList: [
      {
        label: '1',
        value: 1
      },
      {
        label: '10',
        value: 10
      },
      {
        label: '25',
        value: 25
      },
      {
        label: '50',
        value: 50
      },
      {
        label: 'All',
        value: 'all'
      }
    ],
  };
  public first = 0;
  public currentPage = 0;
  public sortMeta: any = {};
  public page: Observable<Page<Car>>;
  public pageUrl = new Subject<string>();
  public filter: BehaviorSubject<Filter> = new BehaviorSubject({
    page: {
      offset: 0,
      size: this.paginatorOptions.itemsPerPage,
    }
  });

  public displayUpload: boolean;
  public newUploadRecords: Car[];
  public importForm: FormGroup;

  constructor(
    private carService: CarService,
    private formBuilder: FormBuilder
  ) {

    this.importForm = this.formBuilder.group({
      orders: new FormArray([])
    });

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

  saveUpload() {
    console.log('importForm', this.importForm);
    console.log('importForm', this.importForm.value);
    // const recCount = this.newUploadRecords.length;
    // let counter = 0;
    // this.newUploadRecords.forEach(carRecord => {
    //   this.carService.saveCar(carRecord).subscribe((response) => {
    //     counter++;
    //     if (counter === recCount) {
    //       alert('done');
    //       this.displayUpload = false;
    //     }
    //   }, (err) => {

    //   });
    // });
    // this.newUploadRecords = [];
    return false;
  }
  deleteCar(car) {

  }

  _handlePageChange(event) {
    console.log('page change event', event);
    this.currentPage = event.currentPage;
    this.paginatorOptions.itemsPerPage = event.itemsPerPage;
    this.first = (this.currentPage - 1) * this.paginatorOptions.itemsPerPage;

    this.filter.next({
      ...this.filter.value, ...
      {
        page: {
          offset: this.first,
          size: this.paginatorOptions.itemsPerPage,
        }
      }
    }
    );
    return false;
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
    console.log('sort handler', event);
    this.sortMeta = event;
    let order = 'asc';
    if (event.order === -1) {
      order = 'desc';
    }
    const sortUpdate = {
      ...this.filter.value,
      ...{ sort: `${event.field}[${order}]` }
    };
    console.log(sortUpdate);
    this.filter.next(sortUpdate);
  }

  onFileChange(ev) {
    this.newUploadRecords = [];
    let workBook = null;
    let jsonData = null;
    const reader = new FileReader();
    const file = ev.target.files[0];

    reader.onload = (event) => {
      const data = reader.result;
      workBook = XLSX.read(data, { type: 'binary' });
      jsonData = workBook.SheetNames.reduce((initial, name) => {
        const sheet = workBook.Sheets[name];
        initial[name] = XLSX.utils.sheet_to_json(sheet);
        return initial;
      }, {});
      Object.keys(jsonData).sort().forEach(key => {
        const value = jsonData[key];
        if (typeof value === 'object') {
          Object.keys(value).sort().forEach(carObject => {
            this.newUploadRecords.push(value[carObject]);
          });
        }
      });
      this.newUploadRecords.map((o, i) => {
        const control = new FormControl(true); // if first item set to true, else false
        (this.importForm.controls.orders as FormArray).push(control);
      });
    };
    reader.readAsBinaryString(file);
  }


  executeAction(event, type: string) {
    switch (type) {
      case 'Add':
        break;
      case 'Upload':
        this.displayUpload = true;
        break;
      default:
        break;
    }
  }

}
