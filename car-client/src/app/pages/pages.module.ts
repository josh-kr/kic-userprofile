import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarListingsComponent } from './car-listings/car-listings.component';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { PaginatorModule } from '@ers-component-lib/components';
import { ToolbarModule } from '@ers-component-lib/components';

import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from '../app-routing.module';
import { SorticonComponent } from './car-listings/sorticon/sorticon.component';

@NgModule({
  declarations: [CarListingsComponent, SorticonComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    TableModule,
    DialogModule,
    PaginatorModule,
    RouterModule,
    ToolbarModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class PagesModule { }
