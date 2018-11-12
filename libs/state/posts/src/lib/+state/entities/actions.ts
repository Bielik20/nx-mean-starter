import { Action } from '@ngrx/store';
import { Post } from '@nx-mean-starter/models';

export class Select implements Action {
  readonly type = '[Posts Entities] Select';
  constructor(public id: string) {}
}

export class Load implements Action {
  readonly type = '[Posts Entities] Load';
  constructor(public id: string) {}
}

export class LoadSuccess implements Action {
  readonly type = '[Posts Entities] Load Success';
  constructor(public post: Post) {}
}

export class LoadError implements Action {
  readonly type = '[Posts Entities] Load Error';
  constructor(public error: string) {}
}
