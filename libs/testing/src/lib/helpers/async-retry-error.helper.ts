import { Observable, throwError } from 'rxjs';
import { delay, dematerialize, map, materialize } from 'rxjs/operators';

/** source: https://github.com/Reactive-Extensions/RxJS/issues/648 */
export function asyncRetryError<T = any>(
  data: T = {} as any,
  error: any = new Error(),
  delayTime = 10,
  failsCount = 1,
): Observable<T> {
  return throwError(error).pipe(
    materialize(),
    map(notification => {
      if (failsCount-- > 0) {
        return notification;
      }
      makeNotificationOnNext(notification, data);
      return notification;
    }),
    delay(delayTime),
    dematerialize(),
  );
}

function makeNotificationOnNext<T = any>(notification, data: T) {
  notification.kind = 'N';
  notification.error = undefined;
  notification.hasValue = true;
  notification.value = data;
}
