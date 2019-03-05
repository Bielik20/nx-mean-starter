import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { User } from '@nx-mean-starter/models';
import { ofAction } from 'ngrx-actions';
import { of } from 'rxjs';
import { catchError, concatMap, filter, map, tap, withLatestFrom } from 'rxjs/operators';
import { UsersService } from '../../service/users.service';
import { ServerError } from '../entities';
import { State } from '../reducer';
import { LoadBatch, LoadBatchEnd, LoadBatchSuccess } from './actions';
import { getPaginationDone } from './selectors';

@Injectable()
export class PaginationEffects {
  @Effect()
  loadBatch$ = this.actions$.pipe(
    ofAction(LoadBatch),
    withLatestFrom(this.store.select(getPaginationDone)),
    filter(([action, done]) => !done),
    map(([action]) => action),
    concatMap((action: LoadBatch) =>
      this.service.getBatch(action.params).pipe(
        tap((users: User[]) => {
          if (users.length === 0) {
            this.store.dispatch(new LoadBatchEnd());
          }
        }),
        map((users: User[]) => new LoadBatchSuccess(users)),
        catchError(err => of(new ServerError(err))),
      ),
    ),
  );

  constructor(
    private store: Store<State>,
    private actions$: Actions,
    private service: UsersService,
  ) {}
}
