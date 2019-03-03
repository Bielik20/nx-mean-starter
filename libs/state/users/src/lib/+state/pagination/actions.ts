import { Action } from '@ngrx/store';
import { User } from '@nx-mean-starter/models';
import { QueryParams } from 'api-query-params';

export class LoadBatch implements Action {
  readonly type = '[Users Pagination] Load Batch';
  constructor(public params: QueryParams) {}
}

export class LoadBatchSuccess implements Action {
  readonly type = '[Users Pagination] Load Batch Success';
  constructor(public users: User[], public end = false) {}
}

export class LoadBatchEnd implements Action {
  readonly type = '[Users Pagination] Load Batch End';
}
