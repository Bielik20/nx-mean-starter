import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from '@nx-mean-starter/models';
import { UsersState } from '@nx-mean-starter/state/users';
import { InfiniteScrollEvent } from 'ngx-infinite-scroll';
import { combineLatest, Observable } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class UsersComponent implements OnInit {
  users$: Observable<User[]>;
  done$: Observable<boolean>;
  loading$: Observable<boolean>;

  constructor(private store: Store<UsersState.State>) {}

  ngOnInit() {
    this.users$ = this.store.select(UsersState.getPaginationUsers);
    this.done$ = this.store.select(UsersState.getPaginationDone);
    this.loading$ = this.store.select(UsersState.getLoading);

    this.loadInitialBatch();
  }

  private loadInitialBatch() {
    this.users$
      .pipe(
        take(1),
        filter(users => users.length === 0),
        map(() => UsersState.loadInitialBatch({ params: { limit: 20 } })),
      )
      .subscribe(this.store);
  }

  nextBatch(current: InfiniteScrollEvent, skip: number) {
    combineLatest([this.done$, this.loading$])
      .pipe(
        take(1),
        filter(([done, loading]) => !done && !loading),
        map(() => UsersState.loadBatch({ params: { limit: 20, skip } })),
      )
      .subscribe(this.store);
  }

  trackByIdx(i) {
    return i;
  }
}
