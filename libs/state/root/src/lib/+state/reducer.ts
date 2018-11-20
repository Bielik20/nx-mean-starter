import { InjectionToken } from '@angular/core';
import { ActionReducerMap } from '@ngrx/store';
import { AuthState } from '@nx-mean-starter/state/auth';
import { RouterState } from '@nx-mean-starter/state/router';
import { UsersState } from '@nx-mean-starter/state/users';

export interface State {
  router: RouterState.State;
  auth: AuthState.State;
  users: UsersState.State;
}

export const reducers: ActionReducerMap<any> = {};

export const reducerToken = new InjectionToken<ActionReducerMap<any>>('Reducers');

export function getReducers() {
  return reducers;
}

export const reducerProvider = {
  provide: reducerToken,
  useFactory: getReducers,
};
