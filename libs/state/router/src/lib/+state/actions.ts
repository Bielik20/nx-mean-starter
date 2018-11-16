import { Action } from '@ngrx/store';
import { UrlSnapshot } from './reducer';

export class Navigated implements Action {
  readonly type = '[Router] Navigated';
  constructor(public payload: UrlSnapshot) {}
}
