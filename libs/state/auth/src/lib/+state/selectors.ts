import { createFeatureSelector, createSelector } from '@ngrx/store';

import { State } from './reducer';

const getState = createFeatureSelector<State>('auth');

export const getUser = createSelector(getState, (state: State) => state.user);

export const getAuthenticated = createSelector(getState, (state: State) => !!state.user);

export const getJwt = createSelector(getState, (state: State) => state.jwt);

export const getPending = createSelector(getState, (state: State) => state.pending);

export const getError = createSelector(getState, (state: State) => state.error);
