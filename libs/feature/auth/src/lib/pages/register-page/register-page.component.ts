import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Register } from '@nx-mean-starter/models';
import { AuthState } from '@nx-mean-starter/state/auth';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
})
export class RegisterPageComponent implements OnInit {
  registerForm: FormGroup;
  pending$: Observable<boolean>;

  constructor(private store: Store<AuthState.State>, private fb: FormBuilder) {}

  ngOnInit() {
    this.pending$ = this.store.pipe(select(AuthState.getPending));
    this.registerForm = this.fb.group(
      {
        email: ['test@test.com', [Validators.required, Validators.email]],
        password: ['aaa123', Validators.required],
        confirmPassword: ['aaa123', Validators.required],
      },
      { validator: PasswordValidation.matchPassword },
    );
  }

  register(auth: Register) {
    this.store.dispatch(new AuthState.Register(auth));
  }
}

export class PasswordValidation {
  static matchPassword(AC: AbstractControl) {
    const password = AC.get('password').value;
    const confirmPassword = AC.get('confirmPassword').value;
    const incorrect = password !== confirmPassword;
    return incorrect ? { matchPassword: true } : null;
  }
}
