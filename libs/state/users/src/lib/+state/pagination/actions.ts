import { createAction, props } from '@ngrx/store';
import { User } from '@nx-mean-starter/models';
import { QueryParams } from 'api-query-params';

export const loadBatch = createAction(
  '[Users Pagination] Load Batch',
  props<{ params: QueryParams }>(),
);

export const loadBatchSuccess = createAction(
  '[Users Pagination] Load Batch Success',
  props<{ users: User[] }>(),
);

export const loadBatchEnd = createAction('[Auth] Load Batch End');
