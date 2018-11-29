import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AuthState } from '@nx-mean-starter/state/auth';
import { ofAction } from 'ngrx-actions/dist';
import { take, tap } from 'rxjs/operators';

@Component({
  selector: 'app-auth-modal-page',
  templateUrl: './auth-modal-page.component.html',
  styleUrls: ['./auth-modal-page.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AuthModalPageComponent implements OnInit {
  constructor(
    private store: Store<AuthState.State>,
    private actions$: Actions,
    private dialogRef: MatDialogRef<AuthModalPageComponent>,
  ) {}

  ngOnInit() {
    this.setModalCloseAfterLogin();
    setTimeout(() => this.store.dispatch(new AuthState.Logout()));
  }

  private setModalCloseAfterLogin() {
    this.actions$
      .pipe(
        ofAction(AuthState.AuthSuccess),
        take(1),
        tap(() => this.dialogRef.close()),
      )
      .subscribe();
  }
}
