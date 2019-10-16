import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-applied-filters',
  templateUrl: './applied-filters.component.html',
  styleUrls: ['./applied-filters.component.less']
})
export class AppliedFiltersComponent implements OnInit {

  @Input() filters: [];
  @Output() update = new EventEmitter();
  objectKeys = Object.keys;

  constructor() { }

  ngOnInit() {
  }

  prettifyKey(key: string) {
    const fixString = key.replace('.', ' is ');
    return fixString;
  }

  click(key) {
    this.update.emit(key);
  }


}
