import { InjectionToken } from '@angular/core';
import { ActionReducerMap, combineReducers } from '@ngrx/store';
import { entitiesReducer, EntitiesState } from './entities/reducer';

export interface State {
  entities: EntitiesState;
}

export const reducers = combineReducers<State>({
  entities: entitiesReducer,
});

// export const reducers: ActionReducerMap<State> = {};

export const reducerToken = new InjectionToken<ActionReducerMap<any>>('Reducers');

export function getReducers() {
  return reducers;
}

export const reducerProvider = {
  provide: reducerToken,
  useFactory: getReducers,
};
