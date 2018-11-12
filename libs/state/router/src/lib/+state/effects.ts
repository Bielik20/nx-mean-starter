import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { filter, map, withLatestFrom } from 'rxjs/operators';

import { Navigated } from './actions';
import { State } from './reducer';
import { getUrlSnapshot } from './selectors';

@Injectable()
export class Effects {
  routerState$ = this.store.select(getUrlSnapshot);

  @Effect()
  navigated$ = this.router.events.pipe(
    filter(event => event instanceof NavigationEnd),
    withLatestFrom(this.routerState$),
    map(([event, state]) => state),
    filter(state => !!state),
    map(state => new Navigated(state)),
  );

  constructor(private router: Router, private store: Store<State>) {}
}
