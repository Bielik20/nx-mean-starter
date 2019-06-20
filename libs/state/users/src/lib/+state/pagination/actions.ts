import { createAction, props } from '@ngrx/store';
import { User } from '@nx-mean-starter/models';
import { QueryParams } from 'api-query-params';

// USER

export const loadBatch = createAction(
  '[Users Component] Load Users Batch',
  props<{ params: QueryParams }>(),
);

export const loadInitialBatch = createAction(
  '[Users Component] Load Initial Users Batch',
  props<{ params: QueryParams }>(),
);

// API

export const loadBatchSuccess = createAction(
  '[Users Pagination Effects] Load Users Batch Success',
  props<{ users: User[] }>(),
);

export const loadBatchEnd = createAction('[Users Pagination Effects] Load Users Batch End');
