import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarListingsComponent } from './car-listings.component';

describe('CarListingsComponent', () => {
  let component: CarListingsComponent;
  let fixture: ComponentFixture<CarListingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarListingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarListingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
