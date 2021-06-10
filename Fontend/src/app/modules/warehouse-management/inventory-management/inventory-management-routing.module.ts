import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GoodsReceiptComponent } from './goods-receipt/goods-receipt.component';

export const InventoryManagementRoutedModule = [
    GoodsReceiptComponent
]
const routes: Routes = [
    {
        path: '',
        redirectTo: 'goods-receipt',
        pathMatch: 'full'
    },
    {
        path: 'goods-receipt',
        component: GoodsReceiptComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class InventoryManagementRoutingModule { }
