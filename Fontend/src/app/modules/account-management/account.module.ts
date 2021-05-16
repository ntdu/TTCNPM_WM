import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeModule } from '../../@theme/theme.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { DateRenderComponent } from '../../_helpers/date-render.component';
import { GenderRenderComponent } from '../../_helpers/gender-render.component';

import {
  NbCardModule,
  NbSpinnerModule,
  NbAlertModule,
  NbButtonModule,
  NbCheckboxModule,
  NbInputModule,
  NbSelectModule,
  NbMenuModule
} from '@nebular/theme';

import { AccountRoutedModule, AccountRoutingModule} from './account-routing.module'

@NgModule({
  declarations: [
    ...AccountRoutedModule,
    DateRenderComponent,
    GenderRenderComponent,
  ],
  imports: [
    ThemeModule,
    NbCardModule,
    NbSpinnerModule,
    NbAlertModule,
    NbButtonModule,
    NbCheckboxModule,
    NbInputModule,
    NbSelectModule,
    NbMenuModule,
    Ng2SmartTableModule,
    FormsModule,
    CommonModule,
    AccountRoutingModule,
    ReactiveFormsModule,
    
  ]
})
export class AccountModule { }
