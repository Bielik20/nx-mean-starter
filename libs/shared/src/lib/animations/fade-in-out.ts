import { animate, state, style, transition, trigger } from '@angular/animations';

export const fadeInOut = trigger('fadeInOut', [
  state('in', style({ transform: 'translateX(0)' })),
  transition('void => *', [
    style({ opacity: 0, transform: 'scale(1.1)' }),
    animate('0.3s ease-in', style({ opacity: 1, transform: 'scale(1)' })),
  ]),
  transition('* => void', [
    style({ opacity: 1, transform: 'scale(1)' }),
    animate('0.3s ease-out', style({ opacity: 0, transform: 'scale(0.9)' })),
  ]),
]);
