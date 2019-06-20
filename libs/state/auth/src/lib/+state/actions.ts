import { createAction, props } from '@ngrx/store';
import { AuthData } from '@nx-mean-starter/models';

// USER

export const signOutAuthModal = createAction('[Auth Modal Page] SignOut');

export const signOutSidenav = createAction('[Auth Sidenav Page] SignOut');

// API

export const authIn = createAction('[Auth Effects] Auth In', props<{ authData: AuthData }>());

export const authOut = createAction('[Auth Effects] Auth Out');

export const signOutSuccess = createAction('[Auth Effects] SignOut Success');
