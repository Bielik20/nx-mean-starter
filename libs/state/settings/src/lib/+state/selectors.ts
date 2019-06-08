import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './model';

export const getState = createFeatureSelector<State>('settings');

export const selectSettingsStickyHeader = createSelector(
  getState,
  (state: State) => state.stickyHeader,
);

export const selectSettingsLanguage = createSelector(
  getState,
  (state: State) => state.language,
);

export const selectTheme = createSelector(
  getState,
  settings => settings.theme,
);

export const selectAutoNightMode = createSelector(
  getState,
  settings => settings.autoNightMode,
);

export const selectNightTheme = createSelector(
  getState,
  settings => settings.nightTheme,
);

export const selectHour = createSelector(
  getState,
  settings => settings.hour,
);

export const selectIsNightHour = createSelector(
  selectAutoNightMode,
  selectHour,
  (autoNightMode, hour) => autoNightMode && (hour >= 21 || hour <= 7),
);

export const selectEffectiveTheme = createSelector(
  selectTheme,
  selectNightTheme,
  selectIsNightHour,
  (theme, nightTheme, isNightHour) => (isNightHour ? nightTheme : theme).toLowerCase(),
);
