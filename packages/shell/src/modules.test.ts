import type { ComponentRecordType } from '@vben/types';

import { describe, expect, it } from 'vitest';

import {
  defineAdminModule,
  mergeModuleComponentMaps,
  mergeModuleLocales,
  mergeModuleRoutes,
} from './modules';

const loadComponent = async () => ({}) as any;

describe('admin modules', () => {
  it('returns the module descriptor unchanged', () => {
    const module = defineAdminModule({ name: 'order' });

    expect(module).toEqual({ name: 'order' });
  });

  it('merges module routes', () => {
    const modules = [
      defineAdminModule({
        name: 'order',
        routes: [{ name: 'Order', path: '/order', children: [] }],
      }),
      defineAdminModule({
        name: 'transport',
        routes: [{ name: 'Transport', path: '/transport', children: [] }],
      }),
    ];

    expect(mergeModuleRoutes(modules)).toEqual(
      modules.flatMap((m) => m.routes),
    );
  });

  it('rejects duplicate route names', () => {
    const modules = [
      defineAdminModule({
        name: 'order',
        routes: [{ name: 'Order', path: '/order', children: [] }],
      }),
      defineAdminModule({
        name: 'transport',
        routes: [{ name: 'Order', path: '/transport', children: [] }],
      }),
    ];

    expect(() => mergeModuleRoutes(modules)).toThrow('Duplicate route name');
  });

  it('rejects duplicate nested route names', () => {
    const modules = [
      defineAdminModule({
        name: 'order',
        routes: [
          {
            children: [{ children: [], name: 'OrderList', path: 'list' }],
            name: 'Order',
            path: '/order',
          },
        ],
      }),
      defineAdminModule({
        name: 'transport',
        routes: [
          {
            children: [{ children: [], name: 'OrderList', path: 'list' }],
            name: 'Transport',
            path: '/transport',
          },
        ],
      }),
    ];

    expect(() => mergeModuleRoutes(modules)).toThrow('Duplicate route name');
  });

  it('merges component maps and rejects duplicate keys', () => {
    const componentMap: ComponentRecordType = {
      '/order/list.vue': loadComponent,
    };
    const modules = [
      defineAdminModule({ name: 'order', componentMap }),
      defineAdminModule({
        name: 'transport',
        componentMap: { '/transport/list.vue': loadComponent },
      }),
    ];

    expect(Object.keys(mergeModuleComponentMaps(modules))).toEqual([
      '/order/list.vue',
      '/transport/list.vue',
    ]);

    expect(() =>
      mergeModuleComponentMaps([
        ...modules,
        defineAdminModule({ name: 'order-copy', componentMap }),
      ]),
    ).toThrow('already registered');
  });

  it('merges module locales by namespace', () => {
    const modules = [
      defineAdminModule({
        name: 'order',
        locales: {
          'zh-CN': { order: { title: '订单' } },
          'en-US': {},
        },
      }),
      defineAdminModule({
        name: 'transport',
        locales: {
          'zh-CN': { transport: { title: '运输' } },
          'en-US': {},
        },
      }),
    ];

    expect(mergeModuleLocales(modules)['zh-CN']).toEqual({
      order: { title: '订单' },
      transport: { title: '运输' },
    });
  });
});
