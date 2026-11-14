import type { RouteRecordRaw } from 'vue-router';

import { $t } from '@vben/locales';

const routes: RouteRecordRaw[] = [
  {
    meta: {
      icon: 'lucide:truck',
      order: 110,
      title: $t('transport.title'),
    },
    name: 'Transport',
    path: '/transport',
    children: [
      {
        name: 'TransportList',
        path: 'list',
        component: () => import('./views/list.vue'),
        meta: {
          icon: 'lucide:list',
          title: $t('transport.list.title'),
        },
      },
    ],
  },
];

export { routes };
