import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from '@nx-mean-starter/models';
import { UsersState } from '@nx-mean-starter/state/users';
import { Observable } from 'rxjs';
import { filter, take } from 'rxjs/operators';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  @ViewChild(CdkVirtualScrollViewport) viewport: CdkVirtualScrollViewport;
  users$: Observable<User[]>;
  end$: Observable<boolean>;

  constructor(private store: Store<UsersState.State>) {}

  ngOnInit() {
    this.users$ = this.store.select(UsersState.getPaginationUsers);
    this.end$ = this.store.select(UsersState.getPaginationEnd);
  }

  nextBatch(current: number, skip: number) {
    this.end$
      .pipe(
        take(1),
        filter(end => !end),
      )
      .subscribe(() => {
        const current2 = this.viewport.getRenderedRange().end;
        const total = this.viewport.getDataLength();

        if (current2 === total) {
          this.store.dispatch(new UsersState.LoadBatch({ limit: 20, skip }));
        }
      });
  }

  trackByIdx(i) {
    return i;
  }
}
