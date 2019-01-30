import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { User } from '@nx-mean-starter/models';
import { Action, createReducer, Store } from 'ngrx-actions/dist';
import { Load, LoadAll, LoadAllSuccess, LoadError, LoadSuccess, Select } from './actions';

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

  @Action(Load, LoadAll)
  load(state: EntitiesState): EntitiesState {
    return { ...state, loading: true, error: undefined };
  }

  @Action(LoadSuccess)
  upsertOne(state: EntitiesState, action: LoadSuccess): EntitiesState {
    return entitiesAdapter.upsertOne(action.user, { ...state, loading: false });
  }

  @Action(LoadAllSuccess)
  upsertMany(state: EntitiesState, action: LoadAllSuccess): EntitiesState {
    return entitiesAdapter.upsertMany(action.users, { ...state, loading: false });
  }

  @Action(LoadError)
  loadError(state: EntitiesState, action: LoadError): EntitiesState {
    return { ...state, selectedId: undefined, error: action.error };
  }
}

export function entitiesReducer(state, action) {
  return createReducer(EntitiesStore)(state, action);
}
