import { Action } from '@ngrx/store';
import { AuthData, User } from '@nx-mean-starter/models';

export class AuthSuccess implements Action {
  readonly type = '[Auth] Auth Success';
  constructor(public authData: AuthData) {}
}

export class SignOut implements Action {
  readonly type = '[Auth] SignOut';
}

export class SignOutSuccess implements Action {
  readonly type = '[Auth] SignOut Success';
}
