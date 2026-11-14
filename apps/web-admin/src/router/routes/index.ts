import type { RouteRecordRaw } from 'vue-router';

import type { ComponentRecordType } from '@vben/types';

import { mergeRouteModules } from '@vben/utils';

const dynamicRouteFiles = import.meta.glob('./modules/**/*.ts', {
  eager: true,
});

const appRoutes: RouteRecordRaw[] = mergeRouteModules(dynamicRouteFiles);
const appComponentMap = import.meta.glob(
  '../../views/**/*.vue',
) as ComponentRecordType;

export { appComponentMap, appRoutes };
