import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { User } from '@nx-mean-starter/models';
import { AuthService, LocalStorageService } from '@nx-mean-starter/services';
import { ofAction } from 'ngrx-actions/dist';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { AuthError, Login, LoginSuccess, Logout, LogoutSuccess } from './actions';
import { State } from './reducer';

@Injectable()
export class Effects {
  @Effect()
  login$ = this.actions$.pipe(
    ofAction(Login),
    switchMap(action =>
      this.authService.login(action.login, action.password).pipe(
        map(res => new LoginSuccess(res.user, res.jwt)),
        catchError(err => of(new AuthError(err))),
      ),
    ),
  );

  @Effect()
  logout$ = this.actions$.pipe(
    ofAction(Logout),
    map(() => new LogoutSuccess()),
  );

  @Effect({ dispatch: false })
  loginSuccess$ = this.actions$.pipe(
    ofAction(LoginSuccess),
    tap(action => {
      this.storage.setItem('jwt', action.jwt);
      this.storage.setItem('user', action.user);
    }),
  );

  @Effect({ dispatch: false })
  logoutSuccess$ = this.actions$.pipe(
    ofAction(LogoutSuccess),
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
      this.store.dispatch(new LoginSuccess(user, jwt));
    }
  }
}
