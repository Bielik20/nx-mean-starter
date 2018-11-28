import { createFeatureSelector, createSelector } from '@ngrx/store';

import { State } from './reducer';

const getState = createFeatureSelector<State>('auth');

export const getUserId = createSelector(getState, (state: State) => state.userId);

export const getAuthenticated = createSelector(getState, (state: State) => !!state.userId);

export const getJwt = createSelector(getState, (state: State) => state.jwt);

export const getPending = createSelector(getState, (state: State) => state.pending);

export const getError = createSelector(getState, (state: State) => state.error);
