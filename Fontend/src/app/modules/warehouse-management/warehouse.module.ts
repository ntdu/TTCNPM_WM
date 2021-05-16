import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeModule } from '../../@theme/theme.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SmartTableModule } from 'ng2-smart-table';
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

import { WarehouseRoutedModule, WarehouseRoutingModule } from './warehouse-routing.module';

@NgModule({
  declarations: [
    ...WarehouseRoutedModule
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
    WarehouseRoutingModule,
    ReactiveFormsModule,
    
  ]
})
export class WarehouseModule { }
