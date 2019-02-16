import { ActionReducer } from '@ngrx/store';
import { Action, createReducer, Store } from 'ngrx-actions';
import { AuthIn, AuthOut } from './actions';

export interface State {
  uid: string;
  isAnonymous: boolean;
  ready: boolean;
}

export const initialState = {
  uid: null,
  isAnonymous: false,
  ready: false,
};

@Store<State>(initialState)
export class StateStore {
  @Action(AuthIn)
  authSuccess(state: State, action: AuthIn): State {
    return {
      ...state,
      ...action.authData,
      ready: true,
    };
  }

  @Action(AuthOut)
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
