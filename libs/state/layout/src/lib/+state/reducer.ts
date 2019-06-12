import { Action, createReducer, Store } from 'ngrx-actions';
import {
  ChangeAnimationsElements,
  ChangeAnimationsPage,
  ChangeAnimationsPageDisabled,
  ChangeStickyHeader,
  ChangeTheme,
  SetIsMobile,
  SetSidenav,
  ToggleSidenav,
} from './actions';
import { State } from './model';

@Store<State>({
  showSidenav: false,
  isMobile: true,
  theme: 'dark-theme',
  stickyHeader: true,
  pageAnimations: true,
  pageAnimationsDisabled: false,
  elementsAnimations: true,
})
export class StateStore {
  @Action(SetSidenav)
  setSidenav(state: State, action: SetSidenav): State {
    return { ...state, showSidenav: action.payload };
  }

  @Action(ToggleSidenav)
  toggleSidenavSuccess(state: State): State {
    return { ...state, showSidenav: !state.showSidenav };
  }

  @Action(SetIsMobile)
  setIsMobile(state: State, action: SetIsMobile): State {
    return {
      ...state,
      showSidenav: !action.payload,
      isMobile: action.payload,
    };
  }

  @Action(ChangeTheme, ChangeStickyHeader, ChangeAnimationsPage, ChangeAnimationsElements)
  setTheme(
    state: State,
    action: ChangeTheme | ChangeStickyHeader | ChangeAnimationsPage | ChangeAnimationsElements,
  ): State {
    return { ...state, ...action.payload };
  }

  @Action(ChangeAnimationsPageDisabled)
  setAnimationForBrowser(state: State, action: ChangeAnimationsPageDisabled): State {
    return {
      ...state,
      pageAnimations: false,
      pageAnimationsDisabled: action.payload.pageAnimationsDisabled,
    };
  }
}

export function reducer(state, action) {
  return createReducer(StateStore)(state, action);
}
