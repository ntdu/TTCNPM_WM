import { Component } from '@angular/core';
import { MENU_ITEMS } from './warehouse-menu';
@Component({
  selector: 'ngx-material',
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class MaterialComponent {
  // <router-outlet></router-outlet>

  menu = MENU_ITEMS;
}
