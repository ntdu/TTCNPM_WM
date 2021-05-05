import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { PagesComponent } from './account-management.component';
// import { DashboardModule } from './dashboard/dashboard.module';
// import { ECommerceModule } from './e-commerce/e-commerce.module';
// import { PagesRoutingModule } from './pages-routing.module';
// import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';

@NgModule({
  imports: [
    // PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    // DashboardModule,
    // ECommerceModule,
    // MiscellaneousModule,
  ],
  declarations: [
    PagesComponent,
  ],
})
export class PagesModule {
}
