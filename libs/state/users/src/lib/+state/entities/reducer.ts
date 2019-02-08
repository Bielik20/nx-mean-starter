import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { User } from '@nx-mean-starter/models';
import { Action, createReducer, Store } from 'ngrx-actions/dist';
import {
  Load,
  LoadAll,
  LoadAllSuccess,
  LoadSuccess,
  PatchOne,
  PatchOneSuccess,
  Select,
  ServerError,
} from './actions';

export interface EntitiesState extends EntityState<User> {
  selectedId: string;
  loading: boolean;
  saving: boolean;
  error: string;
}

export const entitiesAdapter: EntityAdapter<User> = createEntityAdapter<User>({
  selectId: (entity: User) => entity._id,
  sortComparer: false,
});

export const initialState = entitiesAdapter.getInitialState({
  selectedId: undefined,
  loading: false,
  saving: false,
  error: undefined,
});

@Store<EntitiesState>(initialState)
export class EntitiesStore {
  @Action(Select)
  select(state: EntitiesState, action: Select): EntitiesState {
    return { ...state, selectedId: action.id };
  }

  @Action(PatchOne)
  updateOne(state: EntitiesState): EntitiesState {
    return { ...state, saving: true, error: undefined };
  }

  @Action(PatchOneSuccess)
  updateOneSuccess(state: EntitiesState, action: PatchOneSuccess): EntitiesState {
    return entitiesAdapter.updateOne(
      { id: action.user._id, changes: action.user },
      { ...state, saving: false, error: undefined },
    );
  }

  @Action(Load, LoadAll)
  load(state: EntitiesState): EntitiesState {
    return { ...state, loading: true, error: undefined };
  }

  @Action(LoadSuccess)
  upsertOne(state: EntitiesState, action: LoadSuccess): EntitiesState {
    return entitiesAdapter.upsertOne(action.user, { ...state, loading: false, error: undefined });
  }

  @Action(LoadAllSuccess)
  upsertMany(state: EntitiesState, action: LoadAllSuccess): EntitiesState {
    return entitiesAdapter.upsertMany(action.users, { ...state, loading: false, error: undefined });
  }

  @Action(ServerError)
  loadError(state: EntitiesState, action: ServerError): EntitiesState {
    return { ...state, selectedId: undefined, error: action.error };
  }
}

export function entitiesReducer(state, action) {
  return createReducer(EntitiesStore)(state, action);
}
