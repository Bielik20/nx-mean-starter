import { defer, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

export function asyncData<T>(data: T, delayTime = 0): Observable<T> {
  return defer(() => Promise.resolve(data)).pipe(delay(delayTime));
}
