import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarListingsComponent } from './car-listings/car-listings.component';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from '@ers-component-lib/components';

@NgModule({
  declarations: [CarListingsComponent],
  imports: [
    CommonModule,
    TableModule,
    PaginatorModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class PagesModule { }
