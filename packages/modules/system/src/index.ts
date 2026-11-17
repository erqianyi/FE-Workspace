import { defineAdminModule } from '@fe-workspace/shell';

import enUSSystem from './locales/en-US/system.json';
import zhCNSystem from './locales/zh-CN/system.json';
import { routes } from './routes';

const moduleSystem = defineAdminModule({
  name: 'system',
  routes,
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
