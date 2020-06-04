import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Car } from '../../../services/models';
import { CarService } from '../../../services/car.service';
import { ErsModalService } from '@ers-component-lib/components';

@Component({
  selector: 'app-add-modal',
  templateUrl: './add-modal.component.html',
  styleUrls: ['./add-modal.component.less']
})
export class AddModalComponent implements OnInit {
  // public newCar: Car;
  public newCarForm: FormGroup;

  @Input() display: boolean;
  // @Output() displayChange = new EventEmitter();
  // @Output() modalClosed = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private carService: CarService,
    private ersModalService: ErsModalService
  ) {

  }

  ngOnInit(): void {
    this.newCarForm = new FormGroup({
      make: new FormControl('', {
        validators: Validators.required
      }),
      model: new FormControl('', {
        validators: Validators.required
      }),
      color: new FormControl('', {
        validators: Validators.required
      }),
      year: new FormControl('', {
        validators: Validators.required
      }),
      vin: new FormControl('', {
        validators: Validators.required
      })
    });
  }

  resetAdd() {
    // this.displayChange.emit(this.display);
    // this.newCar = null;
    this.newCarForm.reset();
  }

  saveAdd() {
    console.log('this.newCarForm', this.newCarForm, this.newCarForm.value, this.newCarForm.valid);
    return false;
    if (!this.newCarForm.valid) {
      return false;
    }
    this.carService.saveCar(this.newCarForm.value).subscribe((response) => {
      // this.display = false;
      // this.modalClosed.emit('reload');
      this.resetAdd();
    }, (err) => {
    });
  }

}
