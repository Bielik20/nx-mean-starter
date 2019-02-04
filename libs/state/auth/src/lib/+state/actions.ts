import { Action } from '@ngrx/store';
import { AuthData } from '@nx-mean-starter/models';

export class AuthIn implements Action {
  readonly type = '[Auth] Auth In';
  constructor(public authData: AuthData) {}
}

export class AuthOut implements Action {
  readonly type = '[Auth] Auth Out';
}

export class SignOut implements Action {
  readonly type = '[Auth] SignOut';
}

export class SignOutSuccess implements Action {
  readonly type = '[Auth] SignOut Success';
}
