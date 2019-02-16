import { Action, createReducer, Store } from 'ngrx-actions';
import { SetIsMobile, SetSidenav, ToggleSidenav } from './actions';

export interface State {
  showSidenav: boolean;
  isMobile: boolean;
}

@Store<State>({
  showSidenav: false,
  isMobile: true,
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
      showSidenav: !action.payload,
      isMobile: action.payload,
    };
  }
}

export function reducer(state, action) {
  return createReducer(StateStore)(state, action);
}
