import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { routeAnimations } from '@nx-mean-starter/shared';
import { LayoutState } from '@nx-mean-starter/state/layout';
import { SettingsState } from '@nx-mean-starter/state/settings';
import Browser from 'browser-detect';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styleUrls: ['./layout-page.component.scss'],
  animations: [routeAnimations],
})
export class LayoutPageComponent implements OnInit {
  isMobile$: Observable<boolean>;
  showSidenav$: Observable<boolean>;
  theme$: Observable<SettingsState.ApplicationTheme>;
  private browser = Browser();

  constructor(private store: Store<LayoutState.State | SettingsState.State>) {}

  ngOnInit() {
    this.isMobile$ = this.store.select(LayoutState.getIsMobile);
    this.showSidenav$ = this.store.select(LayoutState.getShowSidenav);
    this.theme$ = this.store.select(SettingsState.getTheme);

    this.setAnimations();
  }

  private setAnimations() {
    if (this.isIEorEdgeOrSafari()) {
      this.store.dispatch(
        new SettingsState.ActionSettingsChangeAnimationsPageDisabled({
          pageAnimationsDisabled: true,
        }),
      );
    }
  }

  private isIEorEdgeOrSafari() {
    return ['ie', 'edge', 'safari'].includes(this.browser.name);
  }

  toggleSidenav() {
    this.store.dispatch(new LayoutState.ToggleSidenav());
  }

  openedChangeSidenav(value: boolean) {
    this.store.dispatch(new LayoutState.SetSidenav(value));
  }
}
