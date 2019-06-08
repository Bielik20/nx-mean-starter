import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { fadeRouter } from '@nx-mean-starter/shared';
import { LayoutState } from '@nx-mean-starter/state/layout';
import { SettingsState } from '@nx-mean-starter/state/settings';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styleUrls: ['./layout-page.component.scss'],
  animations: [fadeRouter],
})
export class LayoutPageComponent implements OnInit {
  isMobile$: Observable<boolean>;
  showSidenav$: Observable<boolean>;
  theme$: Observable<SettingsState.ApplicationTheme>;

  constructor(private store: Store<LayoutState.State>) {}

  ngOnInit() {
    this.isMobile$ = this.store.select(LayoutState.getIsMobile);
    this.showSidenav$ = this.store.select(LayoutState.getShowSidenav);
    this.theme$ = this.store.select(SettingsState.getTheme);
  }

  toggleSidenav() {
    this.store.dispatch(new LayoutState.ToggleSidenav());
  }

  openedChangeSidenav(value: boolean) {
    this.store.dispatch(new LayoutState.SetSidenav(value));
  }
}
