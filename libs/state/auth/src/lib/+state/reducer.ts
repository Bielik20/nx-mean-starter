import { ActionReducer } from '@ngrx/store';
import { User } from '@nx-mean-starter/models';
import { Action, createReducer, Store } from 'ngrx-actions/dist';

import {
  AuthError,
  Login,
  LoginSuccess,
  Logout,
  LogoutSuccess,
} from './actions';

export interface State {
  user: User;
  jwt: string;
  pending: boolean;
  error: string;
}

export const initialState = {
  user: undefined,
  jwt: undefined,
  pending: false,
  error: undefined,
};

@Store<State>(initialState)
export class StateStore {
  @Action(Login, Logout)
  loginLogout(state: State): State {
    return { ...state, pending: true, error: undefined };
  }

  @Action(LoginSuccess)
  loginSuccess(state: State, action: LoginSuccess): State {
    return {
      ...state,
      user: action.user,
      jwt: action.jwt,
      pending: false,
      error: undefined,
    };
  }

  @Action(LogoutSuccess)
  logoutSuccess(state: State): State {
    return {
      ...state,
      user: undefined,
      jwt: undefined,
      pending: false,
      error: undefined,
    };
  }

  @Action(AuthError)
  error(state: State, action: AuthError): State {
    return { ...state, pending: false, error: action.message };
  }
}

export function reducer(state, action) {
  return createReducer(StateStore)(state, action);
}

/** Clears storage on Logout Success */
export function logoutMetaReducer(
  _reducer: ActionReducer<any>,
): ActionReducer<any> {
  return function(state, action) {
    return _reducer(
      action.type === '[Auth] Logout Success' ? undefined : state,
      action,
    );
  };
}
