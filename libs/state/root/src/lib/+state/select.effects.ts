import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { PostsState } from '@nx-mean-starter/state/posts';
import { RouterState } from '@nx-mean-starter/state/router';
import { ofAction } from 'ngrx-actions/dist';
import { filter, map } from 'rxjs/operators';

@Injectable()
export class SelectEffects {
  @Effect()
  post$ = this.actions$.pipe(
    ofAction(RouterState.Navigated),
    map(action => this.getSelectAction(action)),
    filter(action => !!action),
  );

  constructor(private actions$: Actions) {}

  getSelectAction(action: RouterState.Navigated): Action {
    const navigation = action.payload.url.split('/')[1];
    const id = action.payload.params['id'];
    if (!id) {
      return null;
    }
    switch (navigation) {
      case 'posts':
        return new PostsState.Select(id);
    }
    return null;
  }
}
