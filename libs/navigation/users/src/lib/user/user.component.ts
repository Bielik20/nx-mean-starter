import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from '@nx-mean-starter/models';
import { ROUTE_ANIMATIONS_ELEMENTS } from '@nx-mean-starter/shared';
import { AuthState } from '@nx-mean-starter/state/auth';
import { RootState } from '@nx-mean-starter/state/root';
import { UsersState } from '@nx-mean-starter/state/users';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  user$: Observable<User>;
  authUserId$: Observable<string>;

  get isAuthUser$(): Observable<boolean> {
    return combineLatest(this.user$, this.authUserId$).pipe(
      map(([user, id]: [User, string]) => !!user && user._id === id),
    );
  }

  constructor(private store: Store<RootState.State>) {}

  ngOnInit() {
    this.user$ = this.store.select(UsersState.getSelectedUser);
    this.authUserId$ = this.store.select(AuthState.getUserId);
  }
}
