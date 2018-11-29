import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Login } from '@nx-mean-starter/models';
import { AuthState } from '@nx-mean-starter/state/auth';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  loginForm: FormGroup;
  pending$: Observable<boolean>;

  constructor(private store: Store<AuthState.State>, private fb: FormBuilder) {}

  ngOnInit() {
    this.pending$ = this.store.pipe(select(AuthState.getPending));
    this.loginForm = this.fb.group({
      email: ['test@test.com', [Validators.required, Validators.email]],
      password: ['aaa123', Validators.required],
    });
  }

  login(auth: Login) {
    this.store.dispatch(new AuthState.Login(auth));
  }
}
