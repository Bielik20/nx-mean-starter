import { UrlSnapshot } from './reducer';
import { Action } from '@ngrx/store';

export class Navigated implements Action {
  readonly type = '[Router] Navigated';
  constructor(public payload: UrlSnapshot) {}
}
