// based on: https://github.com/ngrx/platform/issues/101#issuecomment-351998548
import { makeStateKey } from '@angular/platform-browser';

export function stateSetter(reducer) {
  return function(state: any, action: any) {
    if (action.type === 'SET_ROOT_STATE') {
      return action.payload;
    }
    return reducer(state, action);
  };
}

export const metaReducers = [stateSetter];

export const NGRX_STATE = makeStateKey('NGRX_STATE');
