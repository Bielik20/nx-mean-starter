import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { User } from '@nx-mean-starter/models';
import { loadBatch, loadBatchSuccess } from '../pagination';
import {
  load,
  loadAll,
  loadAllSuccess,
  loadSuccess,
  patchOne,
  patchOneSuccess,
  select,
  serverError,
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

export const factory = createReducer<EntitiesState>(
  initialState,

  on(select, (state, { selectedId }) => ({
    ...state,
    selectedId,
  })),

  on(patchOne, state => ({
    ...state,
    saving: true,
    error: undefined,
  })),

  on(patchOneSuccess, (state, { user }) =>
    entitiesAdapter.updateOne(
      { id: user._id, changes: user },
      { ...state, saving: false, error: undefined },
    ),
  ),

  on(load, loadAll, loadBatch, state => ({
    ...state,
    loading: true,
    error: undefined,
  })),

  on(loadSuccess, (state, { user }) =>
    entitiesAdapter.upsertOne(user, { ...state, loading: false, error: undefined }),
  ),

  on(loadAllSuccess, loadBatchSuccess, (state, { users }) =>
    entitiesAdapter.upsertMany(users, { ...state, loading: false, error: undefined }),
  ),

  on(serverError, (state, { error }) => ({ ...state, selectedId: undefined, error: error })),
);

export function entitiesReducer(state: EntitiesState | undefined, action: Action) {
  return factory(state, action);
}
