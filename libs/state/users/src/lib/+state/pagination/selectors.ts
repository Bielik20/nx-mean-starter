import { createSelector } from '@ngrx/store';
import { getState } from '../selector';

export const getPaginationState = createSelector(
  getState,
  state => state.pagination,
);

export const getPaginationIds = createSelector(
  getPaginationState,
  state => state.ids,
);

export const getPaginationDone = createSelector(
  getPaginationState,
  state => state.done,
);
