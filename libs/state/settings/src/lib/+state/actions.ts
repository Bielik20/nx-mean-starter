import { Action } from '@ngrx/store';
import { ApplicationTheme } from './model';

export enum SettingsActionTypes {
  CHANGE_THEME = '[Settings] Change Theme',
  CHANGE_STICKY_HEADER = '[Settings] Change Sticky Header',
  CHANGE_ANIMATIONS_PAGE = '[Settings] Change Animations Page',
  CHANGE_ANIMATIONS_PAGE_DISABLED = '[Settings] Change Animations Page Disabled',
  CHANGE_ANIMATIONS_ELEMENTS = '[Settings] Change Animations Elements',
}

export class ActionSettingsChangeTheme implements Action {
  readonly type = SettingsActionTypes.CHANGE_THEME;

  constructor(readonly payload: { theme: ApplicationTheme }) {}
}

export class ActionSettingsChangeStickyHeader implements Action {
  readonly type = SettingsActionTypes.CHANGE_STICKY_HEADER;

  constructor(readonly payload: { stickyHeader: boolean }) {}
}

export class ActionSettingsChangeAnimationsPage implements Action {
  readonly type = SettingsActionTypes.CHANGE_ANIMATIONS_PAGE;

  constructor(readonly payload: { pageAnimations: boolean }) {}
}

export class ActionSettingsChangeAnimationsPageDisabled implements Action {
  readonly type = SettingsActionTypes.CHANGE_ANIMATIONS_PAGE_DISABLED;

  constructor(readonly payload: { pageAnimationsDisabled: boolean }) {}
}

export class ActionSettingsChangeAnimationsElements implements Action {
  readonly type = SettingsActionTypes.CHANGE_ANIMATIONS_ELEMENTS;

  constructor(readonly payload: { elementsAnimations: boolean }) {}
}

export type SettingsActions =
  | ActionSettingsChangeTheme
  | ActionSettingsChangeAnimationsPage
  | ActionSettingsChangeAnimationsPageDisabled
  | ActionSettingsChangeAnimationsElements
  | ActionSettingsChangeStickyHeader;
