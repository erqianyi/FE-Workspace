import type { PluginOption } from 'vite';

import { lazyImport, VxeResolver } from 'vite-plugin-lazy-import';

async function viteVxeTableImportsPlugin(): Promise<PluginOption> {
  return [
    lazyImport({
      resolvers: [
        VxeResolver({
          libraryName: 'vxe-pc-ui',
        }),
        VxeResolver({
          libraryName: 'vxe-table',
        }),
      ],
    }),
  ];
}

export { viteVxeTableImportsPlugin };
