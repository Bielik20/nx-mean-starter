import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AuthDataProxy } from '@nx-mean-starter/models';
import { RouterState } from '@nx-mean-starter/state/router';
import { User as FirebaseUser } from 'firebase';
import { ofAction } from 'ngrx-actions';
import { from } from 'rxjs';
import { filter, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { AuthIn, AuthOut, SignOut, SignOutSuccess } from './actions';
import { State } from './reducer';
import { getAuthenticated } from './selectors';

@Injectable()
export class Effects {
  @Effect()
  auth$ = this.afa.authState.pipe(
    map((firebaseUser: FirebaseUser) => {
      if (!!firebaseUser) {
        const authState = AuthDataProxy.Create(firebaseUser.toJSON());
        return new AuthIn(authState);
      }
      return new AuthOut();
    }),
  );

  @Effect()
  signOut$ = this.actions$.pipe(
    ofAction(SignOut),
    withLatestFrom(this.store.select(getAuthenticated)),
    filter(([action, authenticated]: [SignOut, boolean]) => authenticated),
    switchMap(() => from(this.afa.auth.signOut())),
    map(() => new SignOutSuccess()),
  );

  @Effect({ dispatch: false })
  redirectOnSingOutIfGuarded$ = this.actions$.pipe(
    ofAction(SignOutSuccess),
    withLatestFrom(this.store.select(RouterState.getGuarded)),
    filter(([action, guarded]: [SignOutSuccess, boolean]) => guarded),
    tap(() => this.router.navigate(['/'])),
  );

  constructor(
    private actions$: Actions,
    private afa: AngularFireAuth,
    private router: Router,
    private store: Store<State | RouterState.State>,
  ) {}
}
