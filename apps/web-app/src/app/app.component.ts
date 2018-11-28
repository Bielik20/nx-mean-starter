import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from '@nx-mean-starter/models';
import { AuthState } from '@nx-mean-starter/state/auth';
import { RootState } from '@nx-mean-starter/state/root';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  user$: Observable<User>;

  constructor(private store: Store<RootState.State>) {
    this.user$ = this.store.select(RootState.getAuthenticatedUser);
  }

  login(login: string, password: string) {
    this.store.dispatch(new AuthState.Login(login, password));
  }

  logout() {
    this.store.dispatch(new AuthState.Logout());
  }
}
