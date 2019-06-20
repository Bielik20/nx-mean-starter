import { createAction, props } from '@ngrx/store';
import { AuthData } from '@nx-mean-starter/models';

export const authIn = createAction('[Auth] Auth In', props<{ authData: AuthData }>());

export const authOut = createAction('[Auth] Auth Out');

export const signOut = createAction('[Auth] SignOut');

export const signOutSuccess = createAction('[Auth] SignOut Success');
