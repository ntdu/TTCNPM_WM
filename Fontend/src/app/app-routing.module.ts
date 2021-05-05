import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import {
  NbAuthComponent,
  NbLoginComponent,
  NbLogoutComponent,
  NbRegisterComponent,
  NbRequestPasswordComponent,
  NbResetPasswordComponent,
} from '@nebular/auth';

export const routes: Routes = [
  {
    path: 'account',
    loadChildren: () => import('./modules/account-management/account.module')
      .then(m => m.AccountModule),
  },
  {
    path: 'warehouse',
    loadChildren: () => import('./modules/warehouse-management/warehouse.module')
      .then(m => m.WarehouseModule),
  },
  // {
  //   path: 'pages',
  //   loadChildren: () => import('./modules/account-management-v1/account-management.module')
  //     .then(m => m.PagesModule),
  // },




  // {
  //   path: 'auth',
  //   component: NbAuthComponent,
  //   children: [
  //     {
  //       path: '',
  //       component: NbLoginComponent,
  //     },
  //     {
  //       path: 'login',
  //       component: NbLoginComponent,
  //     },
  //     {
  //       path: 'register',
  //       component: NbRegisterComponent,
  //     },
  //     {
  //       path: 'logout',
  //       component: NbLogoutComponent,
  //     },
  //     {
  //       path: 'request-password',
  //       component: NbRequestPasswordComponent,
  //     },
  //     {
  //       path: 'reset-password',
  //       component: NbResetPasswordComponent,
  //     },
  //   ],
  // },



  { path: '', redirectTo: 'account', pathMatch: 'full' },
  { path: '**', redirectTo: 'account' },
];

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
