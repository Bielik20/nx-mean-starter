import { ActionReducer } from '@ngrx/store';
import { AuthData } from '@nx-mean-starter/models';
import { Action, createReducer, Store } from 'ngrx-actions/dist';
import { AuthSuccess, SignOutSuccess } from './actions';

export interface State {
  data?: Partial<AuthData>;
  ready: boolean;
}

export const initialState = {
  data: {
    stsTokenManager: {} as any,
  },
  ready: false,
};

@Store<State>(initialState)
export class StateStore {
  @Action(AuthSuccess)
  authSuccess(state: State, action: AuthSuccess): State {
    return {
      ...state,
      data: action.authData,
      ready: true,
    };
  }

  @Action(SignOutSuccess)
  signOutSuccess(state: State): State {
    return {
      ...state,
      ...initialState,
      ready: true,
    };
  }
}

export function reducer(state, action) {
  return createReducer(StateStore)(state, action);
}

/** Clears storage on SignOut */
export function signOutMetaReducer(_reducer: ActionReducer<any>): ActionReducer<any> {
  return function(state, action) {
    return _reducer(action.type === '[Auth] SignOut Success' ? undefined : state, action);
  };
}
