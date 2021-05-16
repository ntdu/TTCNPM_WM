import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeModule } from '../../../@theme/theme.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { DateRenderComponent } from '../../../_helpers/date-render.component';
import { GenderRenderComponent } from '../../../_helpers/gender-render.component';
import { NgSelect2Module } from 'ng-select2';

import {
  NbCardModule,
  NbSpinnerModule,
  NbAlertModule,
  NbButtonModule,
  NbCheckboxModule,
  NbInputModule,
  NbSelectModule,
  NbTabsetModule,
  NbMenuModule,
  NbDatepickerModule
} from '@nebular/theme';
import { CustomerAccountManagementRoutingModule, CustomerAccountManagementRoutedModule } from './customer-account-management-routing.module'
import { ListCustomerComponent } from './list-customer-account/list-customer-account.component';
import { SelectEmployeeComponent } from './select-status/select-status.component';
import { CreateCustomerAccountComponent } from './create-customer-account/create-customer-account.component';

@NgModule({
  declarations: [
    ...CustomerAccountManagementRoutedModule,
    ListCustomerComponent,
    SelectEmployeeComponent,
    CreateCustomerAccountComponent
    // DateRenderComponent,
    // GenderRenderComponent
  ],
  imports: [
    CommonModule,
    ThemeModule,
    NbCardModule,
    NbSpinnerModule,
    NbAlertModule,
    NbButtonModule,
    NbCheckboxModule,
    NbInputModule,
    NbSelectModule,
    NbTabsetModule,
    NbMenuModule,
    Ng2SmartTableModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SmartTableModule,
    CustomerAccountManagementRoutingModule,
    NbDatepickerModule,
    NgSelect2Module
  ]
})
export class CustomerManagementModule { }
