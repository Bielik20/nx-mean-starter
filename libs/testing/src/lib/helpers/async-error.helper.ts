import { defer, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

export function asyncError<T>(error: any, delayTime = 0): Observable<never> {
  return defer(() => Promise.reject(error)).pipe(delay(delayTime));
}
