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
import { InventoryManagementRoutedModule, InventoryManagementRoutingModule } from './inventory-management-routing.module'
import { GoodsReceiptComponent } from './goods-receipt/goods-receipt.component';
import { ListInventoryComponent } from './list-inventory/list-inventory.component';

@NgModule({
  declarations: [
    ...InventoryManagementRoutedModule,
    GoodsReceiptComponent,
    ListInventoryComponent
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
    InventoryManagementRoutingModule,
    NbDatepickerModule,
    NgSelect2Module
  ]
})
export class InventoryManagementModule { }
