import { Component } from '@angular/core';

import { MENU_ITEMS } from './account-management-menu';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['account-management.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent {
  // 

  menu = MENU_ITEMS;
}
