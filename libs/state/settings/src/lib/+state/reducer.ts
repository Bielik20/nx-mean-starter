import { SettingsActions, SettingsActionTypes } from './actions';
import { State } from './model';

export const initialState: State = {
  theme: 'dark-theme',
  stickyHeader: true,
  pageAnimations: true,
  pageAnimationsDisabled: false,
  elementsAnimations: true,
};

export function reducer(state: State = initialState, action: SettingsActions): State {
  switch (action.type) {
    case SettingsActionTypes.CHANGE_THEME:
    case SettingsActionTypes.CHANGE_STICKY_HEADER:
    case SettingsActionTypes.CHANGE_ANIMATIONS_PAGE:
    case SettingsActionTypes.CHANGE_ANIMATIONS_ELEMENTS:
      return { ...state, ...action.payload };

    case SettingsActionTypes.CHANGE_ANIMATIONS_PAGE_DISABLED:
      return {
        ...state,
        pageAnimations: false,
        pageAnimationsDisabled: action.payload.pageAnimationsDisabled,
      };

    default:
      return state;
  }
}
