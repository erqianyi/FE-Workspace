import type { RouteRecordRaw } from 'vue-router';

import { $t } from '@vben/locales';

const routes: RouteRecordRaw[] = [
  {
    meta: {
      icon: 'lucide:package',
      order: 100,
      title: $t('order.title'),
    },
    name: 'Order',
    path: '/order',
    children: [
      {
        name: 'OrderList',
        path: 'list',
        component: () => import('./views/list.vue'),
        meta: {
          componentPath: '/order/list.vue',
          icon: 'lucide:list',
          title: $t('order.list.title'),
        },
      },
    ],
  },
];

export { routes };
