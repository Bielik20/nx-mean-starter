declare module 'api-query-params' {
  /** {@link https://www.npmjs.com/package/api-query-params#available-options--opts-|Documentation} */
  export interface AqpOptions {
    /** @default skip */
    skipKey?: string;

    /** @default limit */
    limitKey?: string;

    /** @default fields */
    projectionKey?: string;

    /** @default sort */
    sortKey?: string;

    /** @default filter */
    filterKey?: string;

    /** filter on all keys except the ones specified */
    blacklist?: string[];

    /** filter only on the keys specified */
    whitelist?: string[];

    /** {@link https://www.npmjs.com/package/api-query-params#add-custom-casting-functions|Documentation} */
    casters?: { [key: string]: (val: any) => any };

    /** {@link https://www.npmjs.com/package/api-query-params#specify-casting-per-param-keys|Documentation} */
    castParams?: { [key: string]: string };
  }

  type SortValue = 1 | -1;

  export interface AqpResult {
    filter?: Map<string, any>;
    sort?: Map<string, SortValue>;
    skip?: number;
    limit?: number;
    projection?: string | any;
  }

  export default function aqp(query: string | {}, options?: AqpOptions): AqpResult;
}
