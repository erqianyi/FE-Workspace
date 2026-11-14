import { startAdminApp } from '@fe-workspace/shell';
import App from '@fe-workspace/shell/app';
import { moduleSystem } from '@modules/system';

import { loadAppMessages } from './locales';
import { overridesPreferences } from './preferences';
import { appComponentMap, appRoutes } from './router/routes';

async function initApplication() {
  await startAdminApp({
    App,
    appComponentMap,
    extraRoutes: appRoutes,
    loadAppMessages,
    modules: [moduleSystem],
    namespace: import.meta.env.VITE_APP_NAMESPACE,
    overridesPreferences,
  });
}

initApplication();
