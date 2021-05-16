import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountComponent } from './account.component'

export const AccountRoutedModule = [
    AccountComponent,
]

const routes: Routes = [
  {
    path: '',
    component: AccountComponent,
    // canActivate: [AuthGuard],
    children: [
      {
        path: 'customer-account',
        loadChildren: () => import('./customer-account-management/customer-account-management.module')
          .then(m => m.CustomerManagementModule),
      }
    ]
  },

  { path: '', redirectTo: 'customer-account', pathMatch: 'full' },
  { path: '**', redirectTo: 'customer-account' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
