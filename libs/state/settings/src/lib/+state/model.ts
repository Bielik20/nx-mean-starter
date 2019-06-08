export type ApplicationTheme = 'dark-theme' | 'light-theme';

export interface State {
  theme: ApplicationTheme;
  stickyHeader: boolean;
  pageAnimations: boolean;
  pageAnimationsDisabled: boolean;
  elementsAnimations: boolean;
}
