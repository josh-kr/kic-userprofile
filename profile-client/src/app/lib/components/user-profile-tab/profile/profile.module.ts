import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessagesModule, MessageModule, InputMaskModule } from 'primeng/primeng';
import { ProfileComponent } from './profile.component';
import { FormsModule } from '@angular/forms';
import { ProfileService } from '../../../services/profile.service';
import { KdsStencilAccessorsModule } from 'kds-stencil-accessors';
import { DropdownModule } from '@ers-component-lib/components';
import { InputTextBoxModule } from '@ers-component-lib/components';
import { ButtonModule } from '@ers-component-lib/components';
import { DatepickerModule } from '@ers-component-lib/components';

@NgModule({
  declarations: [
    ProfileComponent,
  ],
  imports: [
    CommonModule,
    MessagesModule,
    MessageModule,
    DropdownModule,
    FormsModule,
    InputMaskModule,
    KdsStencilAccessorsModule,
    ButtonModule,
    InputTextBoxModule,
    DatepickerModule
  ],
  entryComponents: [
    ProfileComponent
  ],
  exports: [
    ProfileComponent
  ],
  providers: [
    ProfileService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProfileModule { }
