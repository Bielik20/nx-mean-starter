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

export const getPaginationEnd = createSelector(
  getPaginationState,
  state => state.end,
);
