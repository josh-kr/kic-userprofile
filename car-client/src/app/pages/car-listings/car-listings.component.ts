import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-car-listings',
  templateUrl: './car-listings.component.html',
  styleUrls: ['./car-listings.component.less']
})
export class CarListingsComponent implements OnInit {
  headers = [];

  data = [
    {
      name: 'chevrolet chevelle malibu',
      milesPerGallon: 18,
      cylinders: 8,
      displacement: 307,
      horsepower: 130,
      weight_in_lbs: 3504,
      acceleration: 12,
      year: '1970-01-01',
      origin: 'USA'
    },
    {
      name: 'buick skylark 320',
      milesPerGallon: 15,
      cylinders: 8,
      displacement: 350,
      horsepower: 165,
      weight_in_lbs: 3693,
      acceleration: 11.5,
      year: '1970-01-01',
      origin: 'USA'
    },
    {
      name: 'plymouth satellite',
      milesPerGallon: 18,
      cylinders: 8,
      displacement: 318,
      horsepower: 150,
      weight_in_lbs: 3436,
      acceleration: 11,
      year: '1970-01-01',
      origin: 'USA'
    },
    {
      name: 'amc rebel sst',
      milesPerGallon: 16,
      cylinders: 8,
      displacement: 304,
      horsepower: 150,
      weight_in_lbs: 3433,
      acceleration: 12,
      year: '1970-01-01',
      origin: 'USA'
    },
    {
      name: 'ford torino',
      milesPerGallon: 17,
      cylinders: 8,
      displacement: 302,
      horsepower: 140,
      weight_in_lbs: 3449,
      acceleration: 10.5,
      year: '1970-01-01',
      origin: 'USA'
    },
    {
      name: 'ford galaxie 500',
      milesPerGallon: 15,
      cylinders: 8,
      displacement: 429,
      horsepower: 198,
      weight_in_lbs: 4341,
      acceleration: 10,
      year: '1970-01-01',
      origin: 'USA'
    },
    {
      name: 'chevrolet impala',
      milesPerGallon: 14,
      cylinders: 8,
      displacement: 454,
      horsepower: 220,
      weight_in_lbs: 4354,
      acceleration: 9,
      year: '1970-01-01',
      origin: 'USA'
    },
    {
      name: 'plymouth fury iii',
      milesPerGallon: 14,
      cylinders: 8,
      displacement: 440,
      horsepower: 215,
      weight_in_lbs: 4312,
      acceleration: 8.5,
      year: '1970-01-01',
      origin: 'USA'
    },
    {
      name: 'pontiac catalina',
      milesPerGallon: 14,
      cylinders: 8,
      displacement: 455,
      horsepower: 225,
      weight_in_lbs: 4425,
      acceleration: 10,
      year: '1970-01-01',
      origin: 'USA'
    }
  ];
  isResizable = true;
  defaultTemplateString = `<ers-datatable [headers]="headers" [data]="data"
  [isResizable]="isResizable"
  [sortable]="true"
  [paginatorOptions]="paginatorOptions"
  ></ers-datatable>`;
  templateStr = this.defaultTemplateString;
  itemsPerPageList = [{
    label: '5',
    value: 5
  }, {
    label: '10',
    value: 10
  },
  {
    label: '25',
    value: 25
  },
  {
    label: 'All',
    value: 'all'
  }
  ];
  paginatorOptions = this.setOptions();

  ngOnInit() {
    this.headers = Object.keys(this.data[0]).map((key) => ({
      field: key,
      displayValue: key.replace(/_\w/g, (m) => m[1].toUpperCase()).replace(/([A-Z])/g, ' $1')
    }));
  }

  setOptions() {
    return this.paginatorOptions = {
      displayPaginator: 'both',
      itemsPerPageDropdown: true,
      itemsPerPage: 5,
      displayTotalItems: 'both',
      displayItemsPerPage: 'bottom',
      itemsPerPageList: this.itemsPerPageList
    };
  }
}
