import { createSelector } from '@ngrx/store';
import { getState } from '../selector';
import { entitiesAdapter } from './reducer';

export const getEntitiesState = createSelector(getState, state => state.entities);

export const {
  selectIds: getIds,
  selectEntities: getEntities,
  selectAll: getAllEntities,
  selectTotal: getTotalEntities,
} = entitiesAdapter.getSelectors(getEntitiesState);

export const getSelectedId = createSelector(getEntitiesState, state => state.selectedId);
