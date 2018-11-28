import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { User } from '@nx-mean-starter/models';
import { AuthState } from '@nx-mean-starter/state/auth';
import { Action, createReducer, Store } from 'ngrx-actions/dist';

import { Load, LoadError, LoadSuccess, Select } from './actions';

export interface EntitiesState extends EntityState<User> {
  selectedId: string;
  loading: boolean;
  error: string;
}

export const entitiesAdapter: EntityAdapter<User> = createEntityAdapter<User>({
  selectId: (entity: User) => entity._id,
  sortComparer: false,
});

export const initialState = entitiesAdapter.getInitialState({
  selectedId: undefined,
  loading: false,
  error: undefined,
});

@Store<EntitiesState>(initialState)
export class EntitiesStore {
  @Action(Select)
  select(state: EntitiesState, action: Select): EntitiesState {
    return { ...state, selectedId: action.id };
  }

  @Action(Load)
  load(state: EntitiesState): EntitiesState {
    return { ...state, loading: true, error: undefined };
  }

  @Action(LoadSuccess, AuthState.LoginSuccess)
  upsertOne(state: EntitiesState, action: LoadSuccess | AuthState.LoginSuccess): EntitiesState {
    return entitiesAdapter.upsertOne(action.user, state);
  }

  @Action(LoadError)
  loadError(state: EntitiesState, action: LoadError): EntitiesState {
    return { ...state, selectedId: undefined, error: action.error };
  }
}

export function entitiesReducer(state, action) {
  return createReducer(EntitiesStore)(state, action);
}
