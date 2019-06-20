import { Action, createReducer, on } from '@ngrx/store';
import {
  changeAnimationsElements,
  changeAnimationsPage,
  changeAnimationsPageDisabled,
  changeTheme,
  setIsMobile,
  setSidenav,
  toggleSidenav,
} from './actions';
import { State } from './model';

export const initialState: State = {
  showSidenav: false,
  isMobile: true,
  theme: 'dark-theme',
  stickyHeader: true,
  pageAnimations: true,
  pageAnimationsDisabled: false,
  elementsAnimations: true,
};

export const factory = createReducer<State>(
  initialState,

  on(setSidenav, (state, { showSidenav }) => ({
    ...state,
    showSidenav,
  })),

  on(toggleSidenav, state => ({
    ...state,
    showSidenav: !state.showSidenav,
  })),

  on(setIsMobile, (state, { isMobile }) => ({
    ...state,
    isMobile,
    showSidenav: !isMobile,
  })),

  on(changeTheme, changeAnimationsElements, changeAnimationsPage, (state, payload) => ({
    ...state,
    ...payload,
  })),

  on(changeAnimationsPageDisabled, (state, { pageAnimationsDisabled }) => ({
    ...state,
    pageAnimationsDisabled,
    pageAnimations: false,
  })),
);

export function reducer(state: State | undefined, action: Action) {
  return factory(state, action);
}
