import { createAction, props } from '@ngrx/store';
import { User } from '@nx-mean-starter/models';

export const select = createAction('[Users Entities] Select', props<{ selectedId: string }>());

export const patchOne = createAction(
  '[Users Entities] Patch One',
  props<{ user: Partial<User> }>(),
);

export const patchOneSuccess = createAction(
  '[Users Entities] Patch One Success',
  props<{ user: User }>(),
);

export const load = createAction('[Users Entities] Load', props<{ id: string }>());

export const loadSuccess = createAction('[Users Entities] Load Success', props<{ user: User }>());

export const loadAll = createAction('[Users Entities] Load All');

export const loadAllSuccess = createAction(
  '[Users Entities] Load All Success',
  props<{ users: User[] }>(),
);

export const serverError = createAction(
  '[Users Entities] Server Error',
  props<{ error: string }>(),
);
