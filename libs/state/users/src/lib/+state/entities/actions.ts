import { createAction, props } from '@ngrx/store';
import { User } from '@nx-mean-starter/models';

// USER

export const patchOne = createAction(
  '[User Edit Component] Patch User',
  props<{ user: Partial<User> }>(),
);

// API

export const patchOneSuccess = createAction(
  '[Users Entities Effects] Patch User Success',
  props<{ user: User }>(),
);

export const loadAuthSuccess = createAction(
  '[Users Entities Effects] Load Authenticated User Success',
  props<{ user: User }>(),
);

export const loadSuccess = createAction(
  '[Users Entities Effects] Load User Success',
  props<{ user: User }>(),
);

export const serverErrorUpdate = createAction(
  '[Users Entities Effects - update one] Server Error',
  props<{ error: string }>(),
);

export const serverErrorAuth = createAction(
  '[Users Entities Effects - auth] Server Error',
  props<{ error: string }>(),
);

export const serverErrorLoad = createAction(
  '[Users Entities Effects - load] Server Error',
  props<{ error: string }>(),
);

export const serverErrorLoadBatch = createAction(
  '[Users Pagination Effects] Server Error',
  props<{ error: string }>(),
);

// DEVICE

export const select = createAction('[Select Effects] Select User', props<{ selectedId: string }>());

export const load = createAction('[Users Entities Effects] Load User', props<{ id: string }>());
