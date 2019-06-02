import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AuthState } from '@nx-mean-starter/state/auth';

@Component({
  selector: 'app-auth-modal-page',
  templateUrl: './auth-modal-page.component.html',
  styleUrls: ['./auth-modal-page.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AuthModalPageComponent implements OnInit {
  constructor(
    private store: Store<AuthState.State>,
    private dialogRef: MatDialogRef<AuthModalPageComponent, boolean>,
  ) {}

  ngOnInit() {
    setTimeout(() => this.store.dispatch(new AuthState.SignOut()));
  }

  onSuccess() {
    this.dialogRef.close(true);
  }
}
