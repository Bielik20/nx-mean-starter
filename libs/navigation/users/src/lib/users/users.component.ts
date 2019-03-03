import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { generateUsers, User } from '@nx-mean-starter/models';
import { UsersState } from '@nx-mean-starter/state/users';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, mergeMap, scan, shareReplay, tap, throttleTime } from 'rxjs/operators';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  users$: Observable<User[]>;

  @ViewChild(CdkVirtualScrollViewport) viewport: CdkVirtualScrollViewport;
  batch = 20;
  theEnd = false;
  offset = new BehaviorSubject(null);
  people$: Observable<any[]>;

  constructor(private store: Store<UsersState.State>) {}

  ngOnInit() {
    this.users$ = this.store.select(UsersState.getEntitiesArray);

    const batchMap = this.offset.pipe(
      throttleTime(500),
      mergeMap(n => this.getBatch(n)),
      scan((acc, batch) => {
        return { ...acc, ...batch };
      }, {}),
    );

    this.people$ = batchMap.pipe(map(v => Object.values(v)));
  }

  getUsers() {
    this.store.dispatch(new UsersState.LoadAll());
  }

  getBatch(offset) {
    return of(users).pipe(
      shareReplay(1),
      map(_users => _users.slice(offset, offset + this.batch)),
      tap(arr => (arr.length ? null : (this.theEnd = true))),
      map(arr => {
        return arr.reduce((acc, cur) => {
          return { ...acc, [cur._id]: cur };
        }, {});
      }),
    );
  }

  nextBatch(e, offset) {
    if (this.theEnd) {
      return;
    }

    const current = this.viewport.getRenderedRange().end;
    const total = this.viewport.getDataLength();

    console.log(current, total);

    if (current === total) {
      this.offset.next(offset);
    }
  }

  trackByIdx(i) {
    return i;
  }
}

const users = generateUsers(100);
