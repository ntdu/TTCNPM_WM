import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListInventoryComponent } from './list-inventory/list-inventory.component'

export const InventoryManagementRoutedModule = [
    ListInventoryComponent
]
const routes: Routes = [
    {
        path: '',
        redirectTo: 'list-inventory',
        pathMatch: 'full'
    },
    {
        path: 'list-inventory',
        component: ListInventoryComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class InventoryManagementRoutingModule { }
