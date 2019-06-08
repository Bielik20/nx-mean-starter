import { InjectionToken } from '@angular/core';
import { ActionReducerMap } from '@ngrx/store';
import { AuthState } from '@nx-mean-starter/state/auth';
import { LayoutState } from '@nx-mean-starter/state/layout';
import { RouterState } from '@nx-mean-starter/state/router';
import { SettingsState } from '@nx-mean-starter/state/settings';
import { UsersState } from '@nx-mean-starter/state/users';

export interface State {
  router: RouterState.State;
  auth: AuthState.State;
  users: UsersState.State;
  layout: LayoutState.State;
  settings: SettingsState.State;
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
