import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { routeAnimations } from '@nx-mean-starter/shared';
import { LayoutState } from '@nx-mean-starter/state/layout';
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
  theme$: Observable<LayoutState.ApplicationTheme>;

  constructor(private store: Store<LayoutState.State>) {}

  ngOnInit() {
    this.isMobile$ = this.store.select(LayoutState.getIsMobile);
    this.showSidenav$ = this.store.select(LayoutState.getShowSidenav);
    this.theme$ = this.store.select(LayoutState.getTheme);
  }

  toggleSidenav() {
    this.store.dispatch(LayoutState.toggleSidenav());
  }

  openedChangeSidenav(showSidenav: boolean) {
    this.store.dispatch(LayoutState.setSidenavFromPage({ showSidenav }));
  }
}
