import { defineAdminModule } from '@fe-workspace/shell';

import enUSSystem from './locales/en-US/system.json';
import zhCNSystem from './locales/zh-CN/system.json';
import { routes } from './routes';

const moduleSystem = defineAdminModule({
  name: 'system',
  routes,
  componentMap: {
    '/system/user/list.vue': () => import('./views/user/list.vue'),
    '/system/role/list.vue': () => import('./views/role/list.vue'),
    '/system/menu/list.vue': () => import('./views/menu/list.vue'),
    '/system/dept/list.vue': () => import('./views/dept/list.vue'),
  },
  locales: {
    'zh-CN': {
      system: zhCNSystem,
    },
    'en-US': {
      system: enUSSystem,
    },
  },
});

export { moduleSystem };
