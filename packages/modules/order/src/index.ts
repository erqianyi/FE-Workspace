import { defineAdminModule } from '@fe-workspace/shell';

import enUS from './locales/en-US.json';
import zhCN from './locales/zh-CN.json';
import { routes } from './routes';

const moduleOrder = defineAdminModule({
  name: 'order',
  routes,
  locales: {
    'zh-CN': zhCN,
    'en-US': enUS,
  },
});

export { moduleOrder };
