import { startAdminApp } from '@fe-workspace/shell';
import { moduleTransport } from '@modules/transport';

import { overridesPreferences } from './preferences';

async function initApplication() {
  await startAdminApp({
    modules: [moduleTransport],
    namespace: import.meta.env.VITE_APP_NAMESPACE,
    overridesPreferences,
  });
}

initApplication();
