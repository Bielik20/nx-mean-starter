import { Action } from '@ngrx/store';
import { ApplicationTheme } from './model';

export class SetIsMobile implements Action {
  readonly type = '[Layout] Set Is Mobile';

  constructor(public payload: boolean) {}
}

export class ToggleSidenav implements Action {
  readonly type = '[Layout] Toggle Sidenav';
}

export class SetSidenav implements Action {
  readonly type = '[Layout] Set Sidenav';

  constructor(public payload: boolean) {}
}

export class ChangeTheme implements Action {
  readonly type = '[Settings] Change Theme';

  constructor(readonly payload: { theme: ApplicationTheme }) {}
}

export class ChangeAnimationsElements implements Action {
  readonly type = '[Settings] Change Animations Elements';

  constructor(readonly payload: { elementsAnimations: boolean }) {}
}

export class ChangeAnimationsPage implements Action {
  readonly type = '[Settings] Change Animations Page';

  constructor(readonly payload: { pageAnimations: boolean }) {}
}

export class ChangeAnimationsPageDisabled implements Action {
  readonly type = '[Settings] Change Animations Page Disabled';

  constructor(readonly payload: { pageAnimationsDisabled: boolean }) {}
}
