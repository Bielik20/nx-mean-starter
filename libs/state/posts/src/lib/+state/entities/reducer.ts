import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Post } from '@nx-mean-starter/models';
import { Action, createReducer, Store } from 'ngrx-actions/dist';

import { Load, LoadError, LoadSuccess, Select } from './actions';

export interface EntitiesState extends EntityState<Post> {
  selectedId: string;
  loading: boolean;
  error: string;
}

export const entitiesAdapter: EntityAdapter<Post> = createEntityAdapter<Post>({
  selectId: (entity: Post) => entity.id,
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

  @Action(LoadSuccess)
  loadSuccess(state: EntitiesState, action: LoadSuccess): EntitiesState {
    return entitiesAdapter.upsertOne(action.post, state);
  }

  @Action(LoadError)
  loadError(state: EntitiesState, action: LoadError): EntitiesState {
    return { ...state, selectedId: undefined, error: action.error };
  }
}

export function entitiesReducer(state, action) {
  return createReducer(EntitiesStore)(state, action);
}
