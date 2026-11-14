import { startAdminApp } from '@fe-workspace/shell';
import App from '@fe-workspace/shell/app';
import { moduleOrder } from '@modules/order';
import { moduleSystem } from '@modules/system';
import { moduleTransport } from '@modules/transport';

import { loadAppMessages } from './locales';
import { overridesPreferences } from './preferences';
import { portalRoute } from './router/portal';
import { appComponentMap, appRoutes } from './router/routes';

async function initApplication() {
  await startAdminApp({
    App,
    appComponentMap,
    extraCoreRoutes: [portalRoute],
    extraRoutes: appRoutes,
    loadAppMessages,
    modules: [moduleSystem, moduleOrder, moduleTransport],
    namespace: import.meta.env.VITE_APP_NAMESPACE,
    overridesPreferences,
  });
}

initApplication();
