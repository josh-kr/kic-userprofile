import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as XLSX from 'xlsx';
import { FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';
import { Car } from '../../../services/models';
import { CarService } from '../../../services/car.service';

@Component({
  selector: 'app-import-modal',
  templateUrl: './import-modal.component.html',
  styleUrls: ['./import-modal.component.less']
})
export class ImportModalComponent implements OnInit {
  public newUploadRecords: Car[];
  public importForm: FormGroup;
  @Input() display: boolean;
  @Output() displayChange = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private carService: CarService
  ) { }

  ngOnInit() {
    this.importForm = new FormGroup({
      fileInput: new FormControl(),
      cars: new FormArray([])
    });
  }

  onFileChange(ev) {
    console.log(ev.value);
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
        const control = new FormControl(true);
        (this.importForm.controls.cars as FormArray).push(control);
      });
    };
    reader.readAsBinaryString(file);
  }

  resetImport() {
    this.displayChange.emit(this.display);
    this.newUploadRecords = null;
    this.importForm = new FormGroup({
      fileInput: new FormControl(),
      cars: new FormArray([])
    });
  }

  saveUpload() {
    const selectedCars = this.importForm.value.cars
      .map((v, i) => v ? this.newUploadRecords[i] : null)
      .filter(v => v !== null);

    const recCount = selectedCars.length;
    let counter = 0;
    selectedCars.forEach(carRecord => {
      this.carService.saveCar(carRecord).subscribe((response) => {
        counter++;
        if (counter === recCount) {
          this.display = false;
          this.resetImport();
        }
      }, (err) => {
      });
    });
    return false;
  }


}
