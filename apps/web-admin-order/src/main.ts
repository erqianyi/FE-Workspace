import { startAdminApp } from '@fe-workspace/shell';
import { moduleOrder } from '@modules/order';

import { overridesPreferences } from './preferences';

async function initApplication() {
  await startAdminApp({
    modules: [moduleOrder],
    namespace: import.meta.env.VITE_APP_NAMESPACE,
    overridesPreferences,
  });
}

initApplication();
