import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import { authIn, authOut } from './actions';

export interface State {
  uid: string;
  isAnonymous: boolean;
  ready: boolean;
}

export const initialState: State = {
  uid: null,
  isAnonymous: false,
  ready: false,
};

export const factory = createReducer<State>(
  initialState,

  on(authIn, (state, { authData }) => ({
    ...state,
    ...authData,
    ready: true,
  })),

  on(authOut, state => ({
    ...state,
    ...initialState,
    ready: true,
  })),
);

export function reducer(state: State | undefined, action: Action) {
  return factory(state, action);
}

/** Clears storage on SignOut */
export function signOutMetaReducer(_reducer: ActionReducer<any>): ActionReducer<any> {
  return function(state, action) {
    return _reducer(action.type === '[Auth] SignOut Success' ? undefined : state, action);
  };
}
