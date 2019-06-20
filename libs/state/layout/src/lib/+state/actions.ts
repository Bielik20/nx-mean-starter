import { createAction, props } from '@ngrx/store';
import { ApplicationTheme } from './model';

export const setIsMobile = createAction('[Layout] Set Is Mobile', props<{ isMobile: boolean }>());

export const toggleSidenav = createAction('[Layout] Toggle Sidenav');

export const setSidenav = createAction('[Layout] Set Sidenav', props<{ showSidenav: boolean }>());

export const changeTheme = createAction(
  '[Layout] Change Theme',
  props<{ theme: ApplicationTheme }>(),
);

export const changeAnimationsElements = createAction(
  '[Layout] Change Animations Elements',
  props<{ elementsAnimations: boolean }>(),
);

export const changeAnimationsPage = createAction(
  '[Layout] Change Animations Page',
  props<{ pageAnimations: boolean }>(),
);

export const changeAnimationsPageDisabled = createAction(
  '[Layout] Change Animations Page Disabled',
  props<{ pageAnimationsDisabled: boolean }>(),
);
