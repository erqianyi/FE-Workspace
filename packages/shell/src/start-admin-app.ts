import type { Component } from 'vue';

import type { SupportedLanguagesType } from '@vben/locales';

import type { AdminModule } from './modules';

import { initPreferences } from '@vben/preferences';
import { unmountGlobalLoading } from '@vben/utils';

import ShellApp from './app.vue';
import { createAdminRouter } from './router';

interface StartAdminAppOptions {
  App?: Component;
  appComponentMap?: Parameters<typeof createAdminRouter>[0]['appComponentMap'];
  extraCoreRoutes?: Parameters<typeof createAdminRouter>[0]['extraCoreRoutes'];
  extraRoutes?: Parameters<typeof createAdminRouter>[0]['extraRoutes'];
  loadAppMessages?: (
    lang: SupportedLanguagesType,
  ) => Promise<Record<string, string> | undefined>;
  modules: AdminModule[];
  namespace: string;
  overridesPreferences: NonNullable<
    Parameters<typeof initPreferences>[0]['overrides']
  >;
}

async function startAdminApp(options: StartAdminAppOptions) {
  let {
    App,
    appComponentMap,
    extraCoreRoutes,
    extraRoutes,
    loadAppMessages,
    modules,
    namespace,
    overridesPreferences,
  } = options;

  App ??= ShellApp;

  const env = import.meta.env.PROD ? 'prod' : 'dev';
  const appVersion = import.meta.env.VITE_APP_VERSION;
  const appNamespace = `${namespace}-${appVersion}-${env}`;

  await initPreferences({
    namespace: appNamespace,
    overrides: overridesPreferences,
  });

  const router = createAdminRouter({
    appComponentMap,
    extraCoreRoutes,
    extraRoutes,
    modules,
  });

  const { bootstrap } = await import('./bootstrap');
  await bootstrap({
    App,
    loadAppMessages,
    modules,
    namespace: appNamespace,
    router,
  });

  unmountGlobalLoading();
}

export { startAdminApp };
