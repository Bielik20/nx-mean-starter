import { OverlayContainer } from '@angular/cdk/overlay';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { INIT, select, Store } from '@ngrx/store';
import { AnimationsService, LocalStorageService } from '@nx-mean-starter/shared';
import { merge } from 'rxjs';
import { tap, withLatestFrom } from 'rxjs/operators';
import { SettingsActions, SettingsActionTypes } from './actions';
import { State } from './model';
import { getState, getTheme } from './selectors';

export const SETTINGS_KEY = 'SETTINGS';

@Injectable()
export class Effects {
  constructor(
    private actions$: Actions<SettingsActions>,
    private store: Store<State>,
    private router: Router,
    private overlayContainer: OverlayContainer,
    private animationsService: AnimationsService,
    private localStorageService: LocalStorageService,
  ) {}

  @Effect({ dispatch: false })
  persistSettings = this.actions$.pipe(
    ofType(
      SettingsActionTypes.CHANGE_ANIMATIONS_ELEMENTS,
      SettingsActionTypes.CHANGE_ANIMATIONS_PAGE,
      SettingsActionTypes.CHANGE_ANIMATIONS_PAGE_DISABLED,
      SettingsActionTypes.CHANGE_STICKY_HEADER,
      SettingsActionTypes.CHANGE_THEME,
    ),
    withLatestFrom(this.store.pipe(select(getState))),
    tap(([action, settings]) => this.localStorageService.setItem(SETTINGS_KEY, settings)),
  );

  @Effect({ dispatch: false })
  updateRouteAnimationType = merge(
    INIT,
    this.actions$.pipe(
      ofType(
        SettingsActionTypes.CHANGE_ANIMATIONS_ELEMENTS,
        SettingsActionTypes.CHANGE_ANIMATIONS_PAGE,
        SettingsActionTypes.CHANGE_ANIMATIONS_PAGE_DISABLED,
      ),
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
  updateTheme = merge(INIT, this.actions$.pipe(ofType(SettingsActionTypes.CHANGE_THEME))).pipe(
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
}
