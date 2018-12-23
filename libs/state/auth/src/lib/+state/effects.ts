import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { User } from '@nx-mean-starter/models';
import { LocalStorageService } from '@nx-mean-starter/shared';
import { ofAction } from 'ngrx-actions/dist';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { AuthService } from '../service/auth.service';
import { AuthError, AuthSuccess, Login, Logout, Register } from './actions';
import { State } from './reducer';

@Injectable()
export class Effects {
  @Effect()
  login$ = this.actions$.pipe(
    ofAction(Login),
    switchMap(action =>
      this.authService.login(action.login).pipe(
        map(res => new AuthSuccess(res.user, res.jwt)),
        catchError(err => of(new AuthError(err))),
      ),
    ),
  );

  @Effect()
  register$ = this.actions$.pipe(
    ofAction(Register),
    switchMap(action =>
      this.authService.register(action.register).pipe(
        map(res => new AuthSuccess(res.user, res.jwt)),
        catchError(err => of(new AuthError(err))),
      ),
    ),
  );

  @Effect({ dispatch: false })
  authSuccess$ = this.actions$.pipe(
    ofAction(AuthSuccess),
    tap(action => {
      this.storage.setItem('jwt', action.jwt);
      this.storage.setItem('user', action.user);
    }),
  );

  @Effect({ dispatch: false })
  logout$ = this.actions$.pipe(
    ofAction(Logout),
    tap(() => {
      this.storage.removeItem('jwt');
      this.storage.removeItem('user');
    }),
  );

  constructor(
    private store: Store<State>,
    private actions$: Actions,
    private authService: AuthService,
    private storage: LocalStorageService,
  ) {
    this.checkLocalStorage();
  }

  checkLocalStorage() {
    const user = this.storage.getItem<User>('user');
    const jwt = this.storage.getItem('jwt');
    if (!!user && !!jwt) {
      this.store.dispatch(new AuthSuccess(user, jwt));
    }
  }
}
