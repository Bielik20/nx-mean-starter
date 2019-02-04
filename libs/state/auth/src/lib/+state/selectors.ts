import { createFeatureSelector, createSelector } from '@ngrx/store';

import { State } from './reducer';

const getState = createFeatureSelector<State>('auth');

export const getUserId = createSelector(
  getState,
  (state: State) => state.uid,
);

export const getAuthenticated = createSelector(
  getState,
  (state: State) => !!state.uid,
);

export const getIsAnonymous = createSelector(
  getState,
  (state: State) => state.isAnonymous,
);

export const getReady = createSelector(
  getState,
  (state: State) => !!state.ready,
);
