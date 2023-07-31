import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubscriptionModalComponent } from './subscription-modal/subscription-modal.component';
import { SubscriptionCardComponent } from './subscription-card/subscription-card.component';
import { SubscriptionsComponent } from './subscriptions.component';
import {
  InputSwitchModule,
  CardModule,
  DialogModule,
  RadioButtonModule,
  PanelModule,
  CheckboxModule,
  SelectButtonModule,
  MultiSelectModule
} from 'primeng/primeng';
import { FormsModule } from '@angular/forms';
import { SubscriptionService } from '../../services/subscription.service';
import { SplitLastPipe } from '../../pipes/split-last.pipe';
import { ValuesPipe } from '../../pipes/values.pipe';
import { KdsStencilAccessorsModule } from 'kds-stencil-accessors';
import { ButtonModule, DropdownModule } from '@ers-component-lib/components';

@NgModule({
  declarations: [
    SubscriptionModalComponent,
    SubscriptionCardComponent,
    SubscriptionsComponent,
    SplitLastPipe,
    ValuesPipe
  ],
  imports: [
    CommonModule,
    InputSwitchModule,
    CardModule,
    DialogModule,
    RadioButtonModule,
    DropdownModule,
    FormsModule,
    ButtonModule,
    PanelModule,
    CheckboxModule,
    SelectButtonModule,
    MultiSelectModule,
    KdsStencilAccessorsModule
  ],
  entryComponents: [
    SubscriptionsComponent
  ],
  exports: [
    SubscriptionsComponent
  ],
  providers: [
    SubscriptionService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SubscriptionsModule { }
