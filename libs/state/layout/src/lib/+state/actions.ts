import { createAction, props } from '@ngrx/store';
import { ApplicationTheme } from './model';

// USER

export const toggleSidenav = createAction('[Layout Page] Toggle Sidenav');

export const changeTheme = createAction(
  '[Home Page] Change Theme',
  props<{ theme: ApplicationTheme }>(),
);

export const changeAnimationsElements = createAction(
  '[Home Page] Change Animations Elements',
  props<{ elementsAnimations: boolean }>(),
);

export const changeAnimationsPage = createAction(
  '[Home Page] Change Animations Page',
  props<{ pageAnimations: boolean }>(),
);

// DEVICE

export const setSidenavFromPage = createAction(
  '[Layout Page] Set Sidenav',
  props<{ showSidenav: boolean }>(),
);

export const changeAnimationsPageDisabled = createAction(
  '[Layout Effects] Change Animations Page Disabled',
  props<{ pageAnimationsDisabled: boolean }>(),
);

export const setIsMobile = createAction(
  '[Layout Effects] Set Is Mobile',
  props<{ isMobile: boolean }>(),
);

export const setSidenav = createAction(
  '[Layout Effects] Set Sidenav',
  props<{ showSidenav: boolean }>(),
);
