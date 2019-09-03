import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SorticonComponent } from './sorticon.component';

describe('SorticonComponent', () => {
  let component: SorticonComponent;
  let fixture: ComponentFixture<SorticonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SorticonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SorticonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
