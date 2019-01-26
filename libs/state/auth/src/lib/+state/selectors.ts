import { createFeatureSelector, createSelector } from '@ngrx/store';

import { State } from './reducer';

const getState = createFeatureSelector<State>('auth');

export const getUserId = createSelector(
  getState,
  (state: State) => state.data.uid,
);

export const getAuthenticated = createSelector(
  getState,
  (state: State) => !!state.data.uid,
);

export const getReady = createSelector(
  getState,
  (state: State) => !!state.ready,
);

export const getJwt = createSelector(
  getState,
  (state: State) => state.data.stsTokenManager.accessToken,
);
