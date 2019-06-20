import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { OverlayContainer } from '@angular/cdk/overlay';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ROUTER_NAVIGATION } from '@ngrx/router-store';
import { INIT, select, Store } from '@ngrx/store';
import { AnimationsService, filterWith, LocalStorageService } from '@nx-mean-starter/shared';
import { defer, merge, Observable } from 'rxjs';
import { map, tap, withLatestFrom } from 'rxjs/operators';
import {
  changeAnimationsElements,
  changeAnimationsPage,
  changeAnimationsPageDisabled,
  changeTheme,
  setIsMobile,
  setSidenav,
} from './actions';
import { State } from './model';
import { getIsMobile, getState, getTheme } from './selectors';

export const SETTINGS_KEY = 'LAYOUT';

@Injectable()
export class Effects {
  isMobile$: Observable<boolean> = this.store.pipe(select(getIsMobile));

  @Effect()
  setIsMobile$ = defer(() =>
    this.breakpointObserver.observe([Breakpoints.Small, Breakpoints.XSmall]).pipe(
      map(result => result.matches),
      map(isMobile => setIsMobile({ isMobile })),
    ),
  );

  @Effect()
  closeSidenavOnNavigationIfMobile$ = this.actions$.pipe(
    ofType(ROUTER_NAVIGATION),
    filterWith(this.isMobile$, (isMobile: boolean) => isMobile),
    map(() => setSidenav({ showSidenav: false })),
  );

  @Effect({ dispatch: false })
  persistSettings = this.actions$.pipe(
    ofType(
      changeAnimationsElements,
      changeAnimationsPage,
      changeAnimationsPageDisabled,
      changeTheme,
    ),
    withLatestFrom(this.store.pipe(select(getState))),
    tap(([action, settings]) => this.localStorageService.setItem(SETTINGS_KEY, settings)),
  );

  @Effect({ dispatch: false })
  updateRouteAnimationType = merge(
    INIT,
    this.actions$.pipe(
      ofType(changeAnimationsElements, changeAnimationsPage, changeAnimationsPageDisabled),
    ),
  ).pipe(
    withLatestFrom(this.store.pipe(select(getState))),
    tap(([action, settings]) =>
      this.animationsService.updateRouteAnimationType(
        settings.pageAnimations,
        settings.elementsAnimations,
      ),
    ),
  );

  @Effect({ dispatch: false })
  updateTheme = merge(INIT, this.actions$.pipe(ofType(changeTheme))).pipe(
    withLatestFrom(this.store.pipe(select(getTheme))),
    tap(([action, effectiveTheme]) => {
      const classList = this.overlayContainer.getContainerElement().classList;
      const toRemove = Array.from(classList).filter((item: string) => item.includes('-theme'));
      if (toRemove.length) {
        classList.remove(...toRemove);
      }
      classList.add(effectiveTheme);
    }),
  );

  constructor(
    private actions$: Actions,
    private store: Store<State>,
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private overlayContainer: OverlayContainer,
    private animationsService: AnimationsService,
    private localStorageService: LocalStorageService,
  ) {}
}
