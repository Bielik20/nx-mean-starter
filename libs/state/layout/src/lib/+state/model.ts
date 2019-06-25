export type ApplicationTheme = 'dark-theme' | 'light-theme';

export interface State {
  showSidenav: boolean;
  isMobile: boolean;
  theme: ApplicationTheme;
  pageAnimations: boolean;
  pageAnimationsDisabled: boolean;
  elementsAnimations: boolean;
}
