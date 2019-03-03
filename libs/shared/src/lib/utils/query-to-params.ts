import aqp, { ApiQueryOptions, QueryParams } from 'api-query-params';

export function queryToParams(query: string | {}, options?: ApiQueryOptions): QueryParams {
  return aqp(query, options);
}
