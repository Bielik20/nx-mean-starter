import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ROUTER_NAVIGATION } from '@ngrx/router-store';
import { select, Store } from '@ngrx/store';
import { filterWith } from '@nx-mean-starter/shared';
import { defer, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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
    filterWith(this.isMobile$, (isMobile: boolean) => isMobile),
    map(() => new SetSidenav(false)),
  );

  constructor(
    private actions$: Actions,
    private store: Store<State>,
    private breakpointObserver: BreakpointObserver,
  ) {}
}
