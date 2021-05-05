import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Admin',
    group: true,
  },
  {
    title: 'Quản lý tài khoản',
    icon: 'people-outline',
    children: [
      {
        title: 'Danh sách tài khoản',
        link: 'customer-account',
      }
    ],
  },
  // {
  //   title: 'Quản lý phương tiện',
  //   icon: 'car-outline',
  //   children: [
  //     {
  //       title: 'Phê duyệt phương tiện',
  //       link: 'biker-account/list-biker',
  //     }
  //   ],
  // },

];
