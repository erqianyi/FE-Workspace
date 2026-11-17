/** 系统模块分页列表的统一返回结构。 */
export interface SystemPageResult<T> {
  items: T[];
  total: number;
}

/** 系统模块分页列表的统一查询参数。 */
export interface SystemListParams {
  endTime?: string;
  id?: string;
  name?: string;
  page: number;
  pageSize: number;
  remark?: string;
  startTime?: string;
  status?: 0 | 1;
}
