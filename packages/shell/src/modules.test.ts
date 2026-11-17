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
            meta: { title: 'Order' },
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
            meta: { title: 'Transport' },
            name: 'Transport',
            path: '/transport',
          },
        ],
      }),
    ];

    expect(() => mergeModuleRoutes(modules)).toThrow('Duplicate route name');
  });

  it('derives component maps from module routes', () => {
    const modules = [
      defineAdminModule({
        name: 'order',
        routes: [
          {
            children: [
              {
                component: loadComponent,
                meta: { componentPath: '/order/list.vue', title: 'Order list' },
                name: 'OrderList',
                path: 'list',
              },
            ],
            name: 'Order',
            path: '/order',
          },
        ],
      }),
      defineAdminModule({
        name: 'transport',
        routes: [
          {
            children: [
              {
                component: loadComponent,
                meta: {
                  componentPath: '/transport/list.vue',
                  title: 'Transport list',
                },
                name: 'TransportList',
                path: 'list',
              },
            ],
            name: 'Transport',
            path: '/transport',
          },
        ],
      }),
    ];

    expect(Object.keys(mergeModuleComponentMaps(modules))).toEqual([
      '/order/list.vue',
      '/transport/list.vue',
    ]);
  });

  it('rejects duplicate component paths across modules', () => {
    const createRoutes = () => [
      {
        children: [
          {
            component: loadComponent,
            meta: { componentPath: '/order/list.vue', title: 'Order list' },
            name: 'OrderList',
            path: 'list',
          },
        ],
        meta: { title: 'Order' },
        name: 'Order',
        path: '/order',
      },
    ];

    expect(() =>
      mergeModuleComponentMaps([
        defineAdminModule({ name: 'order', routes: createRoutes() }),
        defineAdminModule({ name: 'order-copy', routes: createRoutes() }),
      ]),
    ).toThrow('already registered');
  });

  it('requires componentPath for module route components', () => {
    expect(() =>
      mergeModuleComponentMaps([
        defineAdminModule({
          name: 'order',
          routes: [
            {
              children: [
                { component: loadComponent, name: 'OrderList', path: 'list' },
              ],
              meta: { title: 'Order' },
              name: 'Order',
              path: '/order',
            },
          ],
        }),
      ]),
    ).toThrow('requires meta.componentPath');
  });

  it('requires a component for componentPath', () => {
    expect(() =>
      mergeModuleComponentMaps([
        defineAdminModule({
          name: 'order',
          routes: [
            {
              children: [
                {
                  meta: {
                    componentPath: '/order/list.vue',
                    title: 'Order list',
                  },
                  name: 'OrderList',
                  path: 'list',
                  redirect: '/order',
                },
              ],
              meta: { title: 'Order' },
              name: 'Order',
              path: '/order',
            },
          ],
        }),
      ]),
    ).toThrow('requires component');
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
