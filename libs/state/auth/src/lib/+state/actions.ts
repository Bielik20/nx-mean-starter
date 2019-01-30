import { Action } from '@ngrx/store';
import { AuthData, User } from '@nx-mean-starter/models';

export class AuthSuccess implements Action {
  readonly type = '[Auth] Auth Success';
  constructor(public authData: AuthData) {}
}

export class Logout implements Action {
  readonly type = '[Auth] Logout';
}

export class LogoutSuccess implements Action {
  readonly type = '[Auth] Logout Success';
}
