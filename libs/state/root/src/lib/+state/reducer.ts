import { InjectionToken } from '@angular/core';
import { ActionReducerMap } from '@ngrx/store';
import { AuthState } from '@nx-mean-starter/state/auth';
import { PostsState } from '@nx-mean-starter/state/posts';
import { RouterState } from '@nx-mean-starter/state/router';

export interface State {
  router: RouterState.State;
  auth: AuthState.State;
  posts: PostsState.State;
}

export const reducers: ActionReducerMap<any> = {};

export const reducerToken = new InjectionToken<ActionReducerMap<any>>(
  'Reducers',
);

export function getReducers() {
  return reducers;
}

export const reducerProvider = {
  provide: reducerToken,
  useFactory: getReducers,
};
