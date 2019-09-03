import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-sorticon',
  templateUrl: './sorticon.component.html',
  styleUrls: ['./sorticon.component.less']
})
export class SorticonComponent implements OnInit {
  @Input() sortEvent: any;
  sortMeta;
  constructor() { }

  ngOnInit() {
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
}
