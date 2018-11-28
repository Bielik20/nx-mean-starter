import { createSelector } from '@ngrx/store';
import { AuthState } from '@nx-mean-starter/state/auth';
import { UsersState } from '@nx-mean-starter/state/users';

export const getAuthenticatedUser = createSelector(
  AuthState.getUserId,
  UsersState.getEntities,
  (userId, entities) => userId && entities[userId],
);
