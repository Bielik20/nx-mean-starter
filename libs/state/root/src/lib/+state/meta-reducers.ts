import { ActionReducer, INIT, MetaReducer, UPDATE } from '@ngrx/store';
import { LocalStorageService } from '@nx-mean-starter/shared';
import { State } from './reducer';

export function initStateFromLocalStorage(reducer: ActionReducer<State>): ActionReducer<State> {
  return function(state, action) {
    const newState = reducer(state, action);
    if ([INIT.toString(), UPDATE.toString()].includes(action.type)) {
      return { ...newState, ...LocalStorageService.loadInitialState() };
    }
    return newState;
  };
}

export const metaReducers: MetaReducer<State>[] = [initStateFromLocalStorage];
