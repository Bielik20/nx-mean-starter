import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Actions, Effect } from '@ngrx/effects';
import { AuthDataProxy } from '@nx-mean-starter/models';
import { User as FirebaseUser } from 'firebase';
import { ofAction } from 'ngrx-actions/dist';
import { map, tap } from 'rxjs/operators';
import { AuthSuccess, Logout, LogoutSuccess } from './actions';

@Injectable()
export class Effects {
  @Effect()
  auth$ = this.afa.authState.pipe(
    map((firebaseUser: FirebaseUser) => {
      if (!!firebaseUser) {
        const authState = AuthDataProxy.Create(firebaseUser.toJSON());
        return new AuthSuccess(authState);
      }
      return new LogoutSuccess();
    }),
  );

  @Effect({ dispatch: false })
  logout$ = this.actions$.pipe(
    ofAction(Logout),
    tap(() => this.afa.auth.signOut()),
  );

  constructor(private actions$: Actions, private afa: AngularFireAuth) {}
}
