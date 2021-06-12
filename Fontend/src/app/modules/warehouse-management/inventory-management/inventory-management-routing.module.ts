import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GoodsReceiptComponent } from './goods-receipt/goods-receipt.component';
import { GoodsListComponent } from './goods-list/goods-list.component';

export const InventoryManagementRoutedModule = [
    GoodsReceiptComponent,
    GoodsListComponent
]
const routes: Routes = [
    {
        path: '',
        redirectTo: 'goods-list',
        pathMatch: 'full'
    },
    // {
    //     path: 'goods-receipt',
    //     component: GoodsReceiptComponent,
    // },
    {
        path: 'goods-list',
        component: GoodsListComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class InventoryManagementRoutingModule { }
