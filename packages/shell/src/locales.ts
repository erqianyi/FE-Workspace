import type { Locale } from 'antdv-next/dist/locale/index';

import type { App } from 'vue';

import type { SupportedLanguagesType } from '@vben/locales';

import type { AdminModule } from './modules';

import { ref } from 'vue';

import { $t, setupI18n as coreSetup } from '@vben/locales';
import { preferences } from '@vben/preferences';

import antdEnLocale from 'antdv-next/dist/locale/en_US';
import antdDefaultLocale from 'antdv-next/dist/locale/zh_CN';
import dayjs from 'dayjs';

import { mergeModuleLocales } from './modules';

const antdLocale = ref<Locale>(antdDefaultLocale);

interface SetupShellI18nOptions {
  loadAppMessages?: (
    lang: SupportedLanguagesType,
  ) => Promise<Record<string, string> | undefined>;
  modules: AdminModule[];
}

async function loadThirdPartyMessage(lang: SupportedLanguagesType) {
  await Promise.all([loadAntdLocale(lang), loadDayjsLocale(lang)]);
}

async function loadDayjsLocale(lang: SupportedLanguagesType) {
  let locale;
  switch (lang) {
    case 'en-US': {
      locale = await import('dayjs/locale/en');
      break;
    }
    case 'zh-CN': {
      locale = await import('dayjs/locale/zh-cn');
      break;
    }
    default: {
      locale = await import('dayjs/locale/en');
    }
  }
  if (locale) {
    dayjs.locale(locale);
  }
}

async function loadAntdLocale(lang: SupportedLanguagesType) {
  switch (lang) {
    case 'en-US': {
      antdLocale.value = antdEnLocale;
      break;
    }
    case 'zh-CN': {
      antdLocale.value = antdDefaultLocale;
      break;
    }
  }
}

async function setupShellI18n(app: App, options: SetupShellI18nOptions) {
  const { loadAppMessages, modules } = options;
  const moduleLocales = mergeModuleLocales(modules);

  await coreSetup(app, {
    defaultLocale: preferences.app.locale,
    loadMessages: async (lang) => {
      const [appMessages] = await Promise.all([
        loadAppMessages?.(lang),
        loadThirdPartyMessage(lang),
      ]);
      const moduleMessages = moduleLocales[lang] ?? {};
      return {
        ...appMessages,
        ...(moduleMessages as Record<string, string>),
      };
    },
    missingWarn: !import.meta.env.PROD,
  });
}

export { $t, antdLocale, setupShellI18n };
