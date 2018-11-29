import { Action } from '@ngrx/store';
import { Login as LoginModel, Register as RegisterModel, User } from '@nx-mean-starter/models';

export class Register implements Action {
  readonly type = '[Auth] Register';
  constructor(public register: RegisterModel) {}
}

export class RegisterSuccess implements Action {
  readonly type = '[Auth] Register Success';
  constructor(public user: User, public jwt: string) {}
}

export class Login implements Action {
  readonly type = '[Auth] Login';
  constructor(public login: LoginModel) {}
}

export class LoginSuccess implements Action {
  readonly type = '[Auth] Login Success';
  constructor(public user: User, public jwt: string) {}
}

export class Logout implements Action {
  readonly type = '[Auth] Logout';
}

export class AuthError implements Action {
  readonly type = '[Auth] Error';
  constructor(public message: string) {}
}
