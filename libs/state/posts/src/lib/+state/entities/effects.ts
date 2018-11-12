import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { PostsService } from '@nx-mean-starter/services';
import { ofAction } from 'ngrx-actions/dist';
import { of } from 'rxjs';
import {
  catchError,
  filter,
  map,
  switchMap,
  withLatestFrom,
} from 'rxjs/operators';

import { Load, LoadError, LoadSuccess, Select } from './actions';
import { EntitiesState } from './reducer';
import { getEntities } from './selectors';

@Injectable()
export class EntitiesEffects {
  entities$ = this.store.select(getEntities);

  @Effect()
  selected$ = this.actions$.pipe(
    ofAction(Select),
    withLatestFrom(this.entities$),
    filter(([action, entities]) => !entities[action.id]),
    map(([action, entities]) => new Load(action.id)),
  );

  @Effect()
  load$ = this.actions$.pipe(
    ofAction(Load),
    switchMap(action =>
      this.service.getOne(action.id).pipe(
        map(post => new LoadSuccess(post)),
        catchError(err => of(new LoadError(err))),
      ),
    ),
  );

  constructor(
    private store: Store<EntitiesState>,
    private actions$: Actions,
    private service: PostsService,
  ) {}
}
