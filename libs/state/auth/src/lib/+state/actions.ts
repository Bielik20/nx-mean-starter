import { Action } from '@ngrx/store';
import { User } from '@nx-mean-starter/models';

export class Login implements Action {
  readonly type = '[Auth] Login';
  constructor(public login: string, public password: string) {}
}

export class LoginSuccess implements Action {
  readonly type = '[Auth] Login Success';
  constructor(public user: User, public jwt: string) {}
}

export class Logout implements Action {
  readonly type = '[Auth] Logout';
}

export class LogoutSuccess implements Action {
  readonly type = '[Auth] Logout Success';
}

export class AuthError implements Action {
  readonly type = '[Auth] Error';
  constructor(public message: string) {}
}
