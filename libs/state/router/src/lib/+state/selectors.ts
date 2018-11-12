import { createFeatureSelector, createSelector } from '@ngrx/store';

import { State } from './reducer';

const getState = createFeatureSelector<State>('router');

export const getNavigationId = createSelector(getState, state => state.navigationId);

export const getUrlSnapshot = createSelector(getState, state => (state ? state.state : null));

export const getUrl = createSelector(getUrlSnapshot, state => state.url);

export const getParams = createSelector(getUrlSnapshot, state => state.params);

export const getQueryParams = createSelector(getUrlSnapshot, state => state.queryParams);

export const getData = createSelector(getUrlSnapshot, state => state.data || {});
