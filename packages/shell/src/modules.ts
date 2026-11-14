import type { App } from 'vue';
import type { RouteRecordRaw } from 'vue-router';

import type { SupportedLanguagesType } from '@vben/locales';
import type { ComponentRecordType } from '@vben/types';

export interface AdminModule {
  name: string;
  routes?: RouteRecordRaw[];
  componentMap?: ComponentRecordType;
  locales?: Record<SupportedLanguagesType, Record<string, unknown>>;
  install?: (app: App) => Promise<void> | void;
}

let registeredModules: AdminModule[] = [];
let registeredAppComponentMap: ComponentRecordType = {};

export function defineAdminModule(module: AdminModule): AdminModule {
  return module;
}

function assertUniqueValues(values: string[], label: string) {
  const seen = new Set<string>();
  for (const value of values) {
    if (seen.has(value)) {
      throw new Error(`Duplicate ${label}: ${value}`);
    }
    seen.add(value);
  }
}

function normalizePath(path: string, parentPath: string) {
  if (path.startsWith('/')) return path;
  if (!parentPath) return `/${path}`;
  return `${parentPath.replace(/\/$/, '')}/${path}`;
}

function collectRoutePaths(
  routes: RouteRecordRaw[],
  parentPath = '',
): string[] {
  const paths: string[] = [];
  for (const route of routes) {
    const currentPath = normalizePath(route.path, parentPath);
    paths.push(currentPath);
    if (route.children?.length) {
      paths.push(...collectRoutePaths(route.children, currentPath));
    }
  }
  return paths;
}

function collectRouteNames(routes: RouteRecordRaw[]): string[] {
  const names: string[] = [];
  for (const route of routes) {
    if (route.name) {
      names.push(String(route.name));
    }
    if (route.children?.length) {
      names.push(...collectRouteNames(route.children));
    }
  }
  return names;
}

function assertUniqueNamespaces(
  target: Record<string, unknown>,
  source: Record<string, unknown>,
  moduleName: string,
) {
  for (const key of Object.keys(source)) {
    if (key in target) {
      throw new Error(
        `Locale namespace "${key}" is already registered by module "${moduleName}".`,
      );
    }
  }
}

export function mergeModuleRoutes(modules: AdminModule[]): RouteRecordRaw[] {
  assertUniqueValues(
    modules.map((module) => module.name),
    'module name',
  );
  const routes = modules.flatMap((module) => module.routes ?? []);
  assertUniqueValues(
    routes.flatMap((route) => collectRouteNames([route])),
    'route name',
  );
  assertUniqueValues(
    routes.flatMap((route) => collectRoutePaths([route])),
    'route path',
  );
  return routes;
}

export function mergeModuleComponentMaps(
  modules: AdminModule[],
): ComponentRecordType {
  const merged: ComponentRecordType = {};
  for (const module of modules) {
    for (const [key, value] of Object.entries(module.componentMap ?? {})) {
      if (key in merged) {
        throw new Error(
          `Component key "${key}" is already registered by module "${module.name}".`,
        );
      }
      merged[key] = value;
    }
  }
  return merged;
}

export function mergeModuleLocales(
  modules: AdminModule[],
): Record<SupportedLanguagesType, Record<string, unknown>> {
  const merged: Partial<
    Record<SupportedLanguagesType, Record<string, unknown>>
  > = {};
  for (const module of modules) {
    for (const [locale, messages] of Object.entries(
      module.locales ?? {},
    ) as Array<[SupportedLanguagesType, Record<string, unknown>]>) {
      merged[locale] ??= {};
      assertUniqueNamespaces(
        merged[locale] as Record<string, unknown>,
        messages,
        module.name,
      );
      Object.assign(merged[locale], messages);
    }
  }
  return merged as Record<SupportedLanguagesType, Record<string, unknown>>;
}

export function getAdminModuleComponentKeys(modules: AdminModule[]): string[] {
  return Object.keys(mergeModuleComponentMaps(modules));
}

function normalizeComponentKey(key: string) {
  const normalizedPath = key.replace(/^(\.\/|\.\.\/)+/, '');
  const viewPath = normalizedPath.startsWith('/')
    ? normalizedPath
    : `/${normalizedPath}`;
  const componentPath = viewPath.replace(/^\/views/, '');
  return componentPath.endsWith('.vue')
    ? componentPath.slice(0, -4)
    : componentPath;
}

export function configureAdminModules(
  modules: AdminModule[],
  options?: { appComponentMap?: ComponentRecordType },
) {
  mergeModuleRoutes(modules);
  mergeModuleComponentMaps(modules);
  mergeModuleLocales(modules);
  registeredModules = modules;
  registeredAppComponentMap = options?.appComponentMap ?? {};
}

export function getAdminModules(): AdminModule[] {
  return registeredModules;
}

export function getRegisteredAdminComponentKeys(): string[] {
  return [
    ...Object.keys(registeredAppComponentMap),
    ...Object.keys(mergeModuleComponentMaps(registeredModules)),
  ].map((key) => normalizeComponentKey(key));
}

export function getRegisteredAdminPageMap(): ComponentRecordType {
  return {
    ...registeredAppComponentMap,
    ...mergeModuleComponentMaps(registeredModules),
  };
}
