import { MemoizedSelector, Store } from '@ngrx/store';
import { MemoizedSelectorWithProps } from '@ngrx/store/src/selector';
import { BehaviorSubject, Observable, of } from 'rxjs';

declare var jest;
declare type UnifiedSelector<T = any, Result = any> =
  | MemoizedSelector<T, Result>
  | MemoizedSelectorWithProps<T, any, Result>;

export class StoreStub<StateType = any> extends BehaviorSubject<StateType> {
  static provider = { provide: Store, useValue: new StoreStub() };

  public dispatch = jest.fn();
  public select = jest.fn(this.executeSelector);
  private selectors: Map<UnifiedSelector, any> = new Map();

  constructor(initialState: StateType = null, private defaultReturn = null) {
    super(initialState);
  }

  overrideSelector(selector: UnifiedSelector, value: any) {
    this.selectors.set(selector, value);
  }

  executeSelector(selector: UnifiedSelector) {
    const value = this.selectors.get(selector) || this.defaultReturn;
    return value instanceof Observable ? value : of(value);
  }

  setState(state: StateType) {
    this.next(state);
  }

  setDefaultReturn(value: any) {
    this.defaultReturn = value;
  }
}
