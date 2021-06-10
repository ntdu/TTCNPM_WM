import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MaterialComponent } from './warehouse.component';

export const WarehouseRoutedModule = [
  MaterialComponent,
]

const routes: Routes = [
  {
    path: '',
    component: MaterialComponent,
    // canActivate: [AuthGuard],
    children: [
      {
        path: 'material',
        loadChildren: () => import('./material-management/material-management.module')
          .then(m => m.MaterialManagementModule),
      },
      {
        path: 'goods-receipt',
        loadChildren: () => import('./inventory-management/inventory-management.module')
          .then(m => m.InventoryManagementModule),
      }
    ]
  },

  { path: '', redirectTo: 'material', pathMatch: 'full' },
  { path: '**', redirectTo: 'material' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WarehouseRoutingModule { }
