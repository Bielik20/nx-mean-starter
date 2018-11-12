import { cold, hot } from 'jest-marbles';
import { ColdObservable } from 'jest-marbles/typings/src/rxjs/cold-observable';
import { HotObservable } from 'jest-marbles/typings/src/rxjs/hot-observable';

export class MarblesHelper {
  constructor(public marbles: string, public values?: any, public error?: any) {}

  setMarbles(marbles: string, values?: any, error?: any) {
    this.marbles = marbles;
    this.values = values;
    this.error = error;
  }

  hot(): HotObservable {
    return hot(this.marbles, this.values, this.error);
  }

  cold(): ColdObservable {
    return cold(this.marbles, this.values, this.error);
  }
}
