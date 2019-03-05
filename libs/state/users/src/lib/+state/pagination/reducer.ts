import { User } from '@nx-mean-starter/models';
import { Action, createReducer, Store } from 'ngrx-actions';
import { LoadBatchEnd, LoadBatchSuccess } from './actions';

export interface PaginationState {
  ids: string[];
  done: boolean;
}

export const initialState: PaginationState = {
  ids: [],
  done: false,
};

@Store<PaginationState>(initialState)
export class StateStore {
  @Action(LoadBatchSuccess)
  upsertMany(state: PaginationState, action: LoadBatchSuccess): PaginationState {
    return {
      ...state,
      ids: [...state.ids, ...action.users.map((user: User) => user._id)],
    };
  }

  @Action(LoadBatchEnd)
  end(state: PaginationState): PaginationState {
    return {
      ...state,
      done: true,
    };
  }
}

export function paginationReducer(state, action) {
  return createReducer(StateStore)(state, action);
}
