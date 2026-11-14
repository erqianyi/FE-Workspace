import type { RouteRecordRaw } from 'vue-router';

import { $t } from '#/locales';

const portalRoute: RouteRecordRaw = {
  component: () => import('#/views/portal/index.vue'),
  meta: {
    hideInBreadcrumb: true,
    hideInMenu: true,
    title: $t('page.portal.title'),
  },
  name: 'Portal',
  path: '/portal',
};

export { portalRoute };
