import { Action } from '@ngrx/store';
import { User } from '@nx-mean-starter/models';

export class LoadBatch implements Action {
  readonly type = '[Users Pagination] Load Batch';
}

export class LoadBatchSuccess implements Action {
  readonly type = '[Users Pagination] Load Batch Success';
  constructor(public users: User[]) {}
}
