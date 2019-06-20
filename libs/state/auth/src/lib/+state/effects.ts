import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AuthDataProxy } from '@nx-mean-starter/models';
import { filterWith } from '@nx-mean-starter/shared';
import { RouterState } from '@nx-mean-starter/state/router';
import { User as FirebaseUser } from 'firebase';
import { from } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { authIn, authOut, signOut, signOutSuccess } from './actions';
import { State } from './reducer';
import { getAuthenticated } from './selectors';

@Injectable()
export class Effects {
  @Effect()
  auth$ = this.afa.authState.pipe(
    map((firebaseUser: FirebaseUser) => {
      if (!!firebaseUser) {
        const authData = AuthDataProxy.Create(firebaseUser.toJSON());
        return authIn({ authData });
      }
      return authOut();
    }),
  );

  @Effect()
  signOut$ = this.actions$.pipe(
    ofType(signOut),
    filterWith(this.store.select(getAuthenticated), (authenticated: boolean) => authenticated),
    switchMap(() => from(this.afa.auth.signOut())),
    map(() => signOutSuccess()),
  );

  @Effect({ dispatch: false })
  redirectOnSingOutIfGuarded$ = this.actions$.pipe(
    ofType(signOutSuccess),
    filterWith(this.store.select(RouterState.getGuarded), (guarded: boolean) => guarded),
    tap(() => this.router.navigate(['/'])),
  );

  constructor(
    private actions$: Actions,
    private afa: AngularFireAuth,
    private router: Router,
    private store: Store<State | RouterState.State>,
  ) {}
}
