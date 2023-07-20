import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForwardingComponent } from './forwarding.component';
import {
  MessagesModule,
  MessageModule,
  DropdownModule,
  InputMaskModule,
  DialogModule,
  RadioButtonModule,
  CalendarModule,
  CardModule
} from 'primeng/primeng';
import { FormsModule } from '@angular/forms';
import { ProfileService } from '../../../services/profile.service';
import { ForwardingService } from '../../../services/forwarding.service';
import { ForwardCardComponent } from './forward-card/forward-card.component';
import { ForwardCreateEditModalComponent } from './forward-create-edit-modal/forward-create-edit-modal.component';
import { FilterSearchModule, ButtonModule } from '@ers-component-lib/components';
import { KdsStencilAccessorsModule } from 'kds-stencil-accessors';

@NgModule({
  declarations: [
    ForwardingComponent,
    ForwardCardComponent,
    ForwardCreateEditModalComponent
  ],
  imports: [
    CommonModule,
    MessagesModule,
    MessageModule,
    DropdownModule,
    FormsModule,
    InputMaskModule,
    ButtonModule,
    DialogModule,
    RadioButtonModule,
    CalendarModule,
    FilterSearchModule,
    CardModule,
    KdsStencilAccessorsModule
  ],
  entryComponents: [
    ForwardingComponent
  ],
  exports: [
    ForwardingComponent
  ],
  providers: [
    ProfileService,
    ForwardingService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ForwardingModule { }
