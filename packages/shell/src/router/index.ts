import type { Router, RouteRecordRaw } from 'vue-router';

import type { ComponentRecordType } from '@vben/types';

import type { AdminModule } from '../modules';

import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router';

import { traverseTreeValues } from '@vben/utils';

import { configureAdminModules, mergeModuleRoutes } from '../modules';
import { coreRoutes, fallbackNotFoundRoute } from './core-routes';
import { createRouterGuard } from './guard';

interface AdminRouterOptions {
  appComponentMap?: ComponentRecordType;
  extraCoreRoutes?: RouteRecordRaw[];
  extraRoutes?: RouteRecordRaw[];
  modules: AdminModule[];
}

function createAdminRouter(options: AdminRouterOptions): Router {
  const {
    appComponentMap,
    extraCoreRoutes = [],
    extraRoutes = [],
    modules,
  } = options;
  configureAdminModules(modules, { appComponentMap });

  const accessRoutes: RouteRecordRaw[] = [
    ...extraRoutes,
    ...mergeModuleRoutes(modules),
  ];
  const initialCoreRoutes = [...extraCoreRoutes, ...coreRoutes];
  const coreRouteNames = traverseTreeValues(
    initialCoreRoutes,
    (route) => route.name,
  ) as string[];
  const routes: RouteRecordRaw[] = [
    ...initialCoreRoutes,
    fallbackNotFoundRoute,
  ];

  const router = createRouter({
    history:
      import.meta.env.VITE_ROUTER_HISTORY === 'hash'
        ? createWebHashHistory(import.meta.env.VITE_BASE)
        : createWebHistory(import.meta.env.VITE_BASE),
    routes,
    scrollBehavior: (to, _from, savedPosition) => {
      if (savedPosition) {
        return savedPosition;
      }
      return to.hash
        ? { behavior: 'smooth', el: to.hash }
        : { left: 0, top: 0 };
    },
  });

  createRouterGuard(router, { accessRoutes, coreRouteNames });

  return router;
}

export { createAdminRouter };
