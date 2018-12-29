import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Store } from '@ngrx/store';
import { AuthModalPageComponent } from '@nx-mean-starter/feature/auth';
import { LayoutState } from '@nx-mean-starter/state/layout';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styleUrls: ['./layout-page.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LayoutPageComponent implements OnInit {
  isMobile$: Observable<boolean>;
  showSidenav$: Observable<boolean>;

  constructor(private store: Store<LayoutState.State>, private dialog: MatDialog) {}

  ngOnInit() {
    this.isMobile$ = this.store.select(LayoutState.getIsMobile);
    this.showSidenav$ = this.store.select(LayoutState.getShowSidenav);
  }

  toggleSidenav() {
    this.store.dispatch(new LayoutState.ToggleSidenav());
  }

  openedChangeSidenav(value: boolean) {
    this.store.dispatch(new LayoutState.SetSidenav(value));
  }

  authenticate() {
    this.dialog.open(AuthModalPageComponent);
  }
}
