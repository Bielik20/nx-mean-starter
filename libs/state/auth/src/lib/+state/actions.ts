import { Action } from '@ngrx/store';
import { Login as LoginModel, Register as RegisterModel, User } from '@nx-mean-starter/models';

export class Register implements Action {
  readonly type = '[Auth] Register';
  constructor(public register: RegisterModel) {}
}

export class Login implements Action {
  readonly type = '[Auth] Login';
  constructor(public login: LoginModel) {}
}

export class AuthSuccess implements Action {
  readonly type = '[Auth] Auth Success';
  constructor(public user: User, public jwt: string) {}
}

export class Logout implements Action {
  readonly type = '[Auth] Logout';
}

export class AuthError implements Action {
  readonly type = '[Auth] Error';
  constructor(public message: string) {}
}
