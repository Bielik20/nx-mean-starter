import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ROUTE_ANIMATIONS_ELEMENTS } from '@nx-mean-starter/shared';
import { LayoutState } from '@nx-mean-starter/state/layout';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  settings$: Observable<LayoutState.State>;
  themes = [{ value: 'dark-theme', label: 'Dark' }, { value: 'light-theme', label: 'Light' }];

  constructor(private store: Store<LayoutState.State>) {}

  ngOnInit() {
    this.settings$ = this.store.select(LayoutState.getState);
  }

  onPageAnimationsToggle({ checked: pageAnimations }) {
    this.store.dispatch(LayoutState.changeAnimationsPage({ pageAnimations }));
  }

  onElementsAnimationsToggle({ checked: elementsAnimations }) {
    this.store.dispatch(LayoutState.changeAnimationsElements({ elementsAnimations }));
  }

  onThemeSelect({ value: theme }) {
    this.store.dispatch(LayoutState.changeTheme({ theme }));
  }
}
