import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Customer',
    group: true,
  },
  {
    title: 'Quản lý kho',
    icon: 'people-outline',
    children: [
      {
        title: 'Danh sách sản phẩm',
        link: 'material',
      },
    
      {
        title: 'Tồn kho',
        link: 'inventory',
      }
    ],
  },


];
