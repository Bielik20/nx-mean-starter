import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { User } from '@nx-mean-starter/models';
import { AuthState } from '@nx-mean-starter/state/auth';
import { of } from 'rxjs';
import { catchError, filter, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { UsersService } from '../../service/users.service';
import {
  load,
  loadAuthSuccess,
  loadSuccess,
  patchOne,
  patchOneSuccess,
  select,
  serverErrorAuth,
  serverErrorLoad,
  serverErrorUpdate,
} from './actions';
import { EntitiesState } from './reducer';
import { getEntities } from './selectors';

@Injectable()
export class EntitiesEffects {
  entities$ = this.store.select(getEntities);

  @Effect()
  selected$ = this.actions$.pipe(
    ofType(select),
    withLatestFrom(this.entities$),
    filter(([{ selectedId }, entities]) => !entities[selectedId]),
    map(([{ selectedId }]) => load({ id: selectedId })),
  );

  @Effect()
  updateOne$ = this.actions$.pipe(
    ofType(patchOne),
    map(({ user }) => user),
    switchMap((user: Partial<User>) =>
      this.service.patchMe(user).pipe(
        map((updatedUser: User) => patchOneSuccess({ user: updatedUser })),
        catchError(error => of(serverErrorUpdate({ error }))),
      ),
    ),
  );

  @Effect()
  authenticated$ = this.actions$.pipe(
    ofType(AuthState.authIn),
    switchMap(() =>
      this.service.getMe().pipe(
        map((user: User) => loadAuthSuccess({ user })),
        catchError(error => of(serverErrorAuth({ error }))),
      ),
    ),
  );

  @Effect()
  load$ = this.actions$.pipe(
    ofType(load),
    switchMap(({ id }) =>
      this.service.getOne(id).pipe(
        map(user => loadSuccess({ user })),
        catchError(error => of(serverErrorLoad({ error }))),
      ),
    ),
  );

  constructor(
    private store: Store<EntitiesState>,
    private actions$: Actions,
    private service: UsersService,
  ) {}
}
