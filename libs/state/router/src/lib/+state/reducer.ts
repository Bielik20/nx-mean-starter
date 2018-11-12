import { Params } from '@angular/router';
import { Data } from '@angular/router/src/config';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';

export interface UrlSnapshot {
  url: string;
  params: Params;
  queryParams: Params;
  data: Data;
}

export type State = RouterReducerState<UrlSnapshot>;

export const reducer = routerReducer;
