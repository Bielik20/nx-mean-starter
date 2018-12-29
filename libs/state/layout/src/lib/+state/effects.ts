import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ROUTER_NAVIGATION } from '@ngrx/router-store';
import { select, Store } from '@ngrx/store';
import { defer, Observable } from 'rxjs';
import { filter, map, withLatestFrom } from 'rxjs/operators';
import { SetIsMobile, SetSidenav } from './actions';
import { State } from './reducer';
import { getIsMobile } from './selectors';

@Injectable()
export class Effects {
  isMobile$: Observable<boolean> = this.store.pipe(select(getIsMobile));

  @Effect()
  setIsMobile$ = defer(() =>
    this.breakpointObserver.observe([Breakpoints.Small, Breakpoints.XSmall]).pipe(
      map(result => result.matches),
      map(isMobile => new SetIsMobile(isMobile)),
    ),
  );

  @Effect()
  closeSidenavOnNavigationIfMobile$ = this.actions$.pipe(
    ofType(ROUTER_NAVIGATION),
    withLatestFrom(this.isMobile$),
    map(([action, state]) => state),
    filter(isMobile => isMobile),
    map(() => new SetSidenav(false)),
  );

  constructor(
    private actions$: Actions,
    private store: Store<State>,
    private breakpointObserver: BreakpointObserver,
  ) {}
}
