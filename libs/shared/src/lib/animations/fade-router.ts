import { animate, group, query, style, transition, trigger } from '@angular/animations';

export const fadeRouter = trigger('fadeRouter', [
  transition('* <=> *', [
    query(':enter, :leave', style({ position: 'absolute', left: 0, width: '100%', opacity: 0 }), {
      optional: true,
    }),
    group([
      query(
        ':enter',
        [
          style({ opacity: 0, transform: 'scale(1.02)' }),
          animate('0.2s ease-in', style({ opacity: 1, transform: 'scale(1)' })),
        ],
        {
          optional: true,
        },
      ),
      query(
        ':leave',
        [
          style({ opacity: 1, transform: 'scale(1)' }),
          animate('0.2s ease-out', style({ opacity: 0, transform: 'scale(0.98)' })),
        ],
        {
          optional: true,
        },
      ),
    ]),
  ]),
]);
