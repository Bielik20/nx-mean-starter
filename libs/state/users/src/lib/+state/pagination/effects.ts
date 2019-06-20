import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { User } from '@nx-mean-starter/models';
import { filterWith } from '@nx-mean-starter/shared';
import { of } from 'rxjs';
import { catchError, concatMap, map, tap } from 'rxjs/operators';
import { UsersService } from '../../service/users.service';
import { serverErrorLoadBatch } from '../entities';
import { State } from '../reducer';
import { loadBatch, loadBatchEnd, loadBatchSuccess, loadInitialBatch } from './actions';
import { getPaginationDone } from './selectors';

@Injectable()
export class PaginationEffects {
  @Effect()
  loadBatch$ = this.actions$.pipe(
    ofType(loadBatch, loadInitialBatch),
    filterWith(this.store.select(getPaginationDone), (done: boolean) => !done),
    concatMap(({ params }) =>
      this.service.getBatch(params).pipe(
        tap((users: User[]) => {
          if (users.length === 0) {
            this.store.dispatch(loadBatchEnd());
          }
        }),
        map((users: User[]) => loadBatchSuccess({ users })),
        catchError(error => of(serverErrorLoadBatch({ error }))),
      ),
    ),
  );

  constructor(
    private store: Store<State>,
    private actions$: Actions,
    private service: UsersService,
  ) {}
}
