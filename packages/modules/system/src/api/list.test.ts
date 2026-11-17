import { requestClient } from '@fe-workspace/shell/api/request';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { getRoleList } from './role';
import { getUserList } from './user';

vi.mock('@fe-workspace/shell/api/request', () => ({
  requestClient: {
    get: vi.fn(async () => ({ items: [], total: 0 })),
  },
}));

describe('system list APIs', () => {
  beforeEach(() => {
    vi.mocked(requestClient.get).mockClear();
  });

  it('returns a typed user page result', async () => {
    const result = await getUserList({
      deptId: 'dept-1',
      name: 'Vben',
      page: 2,
      pageSize: 20,
    });

    expect(result).toEqual({ items: [], total: 0 });
    expect(requestClient.get).toHaveBeenCalledWith('/system/user/list', {
      params: {
        deptId: 'dept-1',
        name: 'Vben',
        page: 2,
        pageSize: 20,
      },
    });
  });

  it('returns a typed role page result', async () => {
    const result = await getRoleList({ page: 1, pageSize: 10 });

    expect(result).toEqual({ items: [], total: 0 });
    expect(requestClient.get).toHaveBeenCalledWith('/system/role/list', {
      params: { page: 1, pageSize: 10 },
    });
  });
});
