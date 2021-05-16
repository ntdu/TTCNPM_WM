import { Component } from '@angular/core';
import { MENU_ITEMS } from './account-menu';

@Component({
  selector: 'ngx-account',
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class AccountComponent {
  // <router-outlet></router-outlet>

  menu = MENU_ITEMS;
}
