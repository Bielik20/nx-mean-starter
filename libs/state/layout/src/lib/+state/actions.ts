import { Action } from '@ngrx/store';

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
