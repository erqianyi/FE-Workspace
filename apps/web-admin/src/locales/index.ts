import type { SupportedLanguagesType } from '@vben/locales';

import { loadLocalesMapFromDir } from '@vben/locales';

export { antdLocale } from '@fe-workspace/shell/locales';
export { $t } from '@vben/locales';

const modules = import.meta.glob('./langs/**/*.json');

const localesMap = loadLocalesMapFromDir(
  /\.\/langs\/([^/]+)\/(.*)\.json$/,
  modules,
);

async function loadAppMessages(lang: SupportedLanguagesType) {
  const messages = await localesMap[lang]?.();
  return messages?.default;
}

export { loadAppMessages };
