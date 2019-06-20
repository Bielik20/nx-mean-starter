import { Action, createReducer, on } from '@ngrx/store';
import { User } from '@nx-mean-starter/models';
import { loadBatchEnd, loadBatchSuccess } from './actions';

export interface PaginationState {
  ids: string[];
  done: boolean;
}

export const initialState: PaginationState = {
  ids: [],
  done: false,
};

export const factory = createReducer<PaginationState>(
  initialState,

  on(loadBatchSuccess, (state, { users }) => ({
    ...state,
    ids: [...state.ids, ...users.map((user: User) => user._id)],
  })),

  on(loadBatchEnd, state => ({
    ...state,
    done: true,
  })),
);

export function paginationReducer(state: PaginationState | undefined, action: Action) {
  return factory(state, action);
}
