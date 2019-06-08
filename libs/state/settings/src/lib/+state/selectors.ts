import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './model';

export const getState = createFeatureSelector<State>('settings');

export const getStickyHeader = createSelector(
  getState,
  (state: State) => state.stickyHeader,
);

export const getTheme = createSelector(
  getState,
  settings => settings.theme,
);
