import { Observable, ObservableInput } from 'rxjs';
import { filter, map, withLatestFrom } from 'rxjs/operators';

export function filterWith<T, S>(input: ObservableInput<T>, predicate: (value: T) => boolean) {
  return (source: Observable<S>) =>
    source.pipe(
      withLatestFrom(input),
      filter(([sourceValue, inputValue]: [S, T]) => predicate(inputValue)),
      map(([sourceValue]: [S, T]) => sourceValue),
    );
}
