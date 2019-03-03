import { createSelector } from '@ngrx/store';
import { getEntities } from './entities';
import { getPaginationIds } from './pagination/selectors';

export const getPaginationUsers = createSelector(
  getEntities,
  getPaginationIds,
  (entities, ids) => ids.map(id => entities[id]),
);
