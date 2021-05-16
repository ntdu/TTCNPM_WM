import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListCustomerComponent} from './list-customer-account/list-customer-account.component';

export const CustomerAccountManagementRoutedModule = [
    ListCustomerComponent
]
const routes: Routes = [
    {
        path: '',
        redirectTo: 'list-customer',
        pathMatch: 'full'
    },
    {
        path: 'list-customer',
        component: ListCustomerComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CustomerAccountManagementRoutingModule { }
