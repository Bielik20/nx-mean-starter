import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './model';

export const getState = createFeatureSelector<State>('layout');

export const getIsMobile = createSelector(
  getState,
  (state: State) => state.isMobile,
);

export const getShowSidenav = createSelector(
  getState,
  (state: State) => state.showSidenav,
);

export const getTheme = createSelector(
  getState,
  settings => settings.theme,
);
