import { Action } from '@ngrx/store';
import { User } from '@nx-mean-starter/models';

export class Select implements Action {
  readonly type = '[Users Entities] Select';
  constructor(public id: string) {}
}

export class Load implements Action {
  readonly type = '[Users Entities] Load';
  constructor(public id: string) {}
}

export class LoadSuccess implements Action {
  readonly type = '[Users Entities] Load Success';
  constructor(public user: User) {}
}

export class LoadAll implements Action {
  readonly type = '[Users Entities] Load All';
}

export class LoadAllSuccess implements Action {
  readonly type = '[Users Entities] Load All Success';
  constructor(public users: User[]) {}
}

export class LoadError implements Action {
  readonly type = '[Users Entities] Load Error';
  constructor(public error: string) {}
}
