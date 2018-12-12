import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Register } from '@nx-mean-starter/models';
import { CustomValidatorsService } from '@nx-mean-starter/shared';
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

  constructor(
    private store: Store<AuthState.State>,
    private fb: FormBuilder,
    private customValidators: CustomValidatorsService,
  ) {}

  ngOnInit() {
    this.pending$ = this.store.pipe(select(AuthState.getPending));
    this.registerForm = this.fb.group(
      {
        email: ['test@test.com', [Validators.required, Validators.email]],
        password: ['aaa123', Validators.required],
        confirmPassword: ['aaa123', Validators.required],
      },
      { validator: this.customValidators.confirmPassword },
    );
  }

  register(auth: Register) {
    this.store.dispatch(new AuthState.Register(auth));
  }
}
