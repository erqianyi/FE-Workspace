import type { Component } from 'vue';
import type { Router } from 'vue-router';

import type { SupportedLanguagesType } from '@vben/locales';

import type { AdminModule } from './modules';

import { createApp, watchEffect } from 'vue';

import { registerAccessDirective } from '@vben/access';
import { registerLoadingDirective } from '@vben/common-ui/es/loading';
import { providePluginsOptions } from '@vben/plugins';
import { preferences } from '@vben/preferences';
import { initStores } from '@vben/stores';
import '@vben/styles';
import '@vben/styles/antdv-next';

import { useTitle } from '@vueuse/core';

import { initComponentAdapter } from './adapter/component';
import { initSetupVbenForm, useVbenForm } from './adapter/form';
import { $t, setupShellI18n } from './locales';

interface BootstrapOptions {
  App: Component;
  loadAppMessages?: (
    lang: SupportedLanguagesType,
  ) => Promise<Record<string, string> | undefined>;
  modules: AdminModule[];
  namespace: string;
  router: Router;
}

async function bootstrap(options: BootstrapOptions) {
  const { App, loadAppMessages, modules, namespace, router } = options;

  await initComponentAdapter();
  await initSetupVbenForm();

  providePluginsOptions({
    form: { useVbenForm },
  });

  const app = createApp(App);

  registerLoadingDirective(app, {
    loading: 'loading',
    spinning: 'spinning',
  });

  await setupShellI18n(app, { loadAppMessages, modules });
  await initStores(app, { namespace });
  registerAccessDirective(app);

  const { initTippy } = await import('@vben/common-ui/es/tippy');
  initTippy(app);

  app.use(router);

  const { MotionPlugin } = await import('@vben/plugins/motion');
  app.use(MotionPlugin);

  watchEffect(() => {
    if (preferences.app.dynamicTitle) {
      const routeTitle = router.currentRoute.value.meta?.title;
      const pageTitle =
        (routeTitle ? `${$t(routeTitle)} - ` : '') + preferences.app.name;
      useTitle(pageTitle);
    }
  });

  app.mount('#app');
}

export { bootstrap };
