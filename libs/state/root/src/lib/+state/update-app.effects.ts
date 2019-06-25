import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { SwUpdate } from '@angular/service-worker';
import { Effect } from '@ngrx/effects';
import { filter, switchMap, tap } from 'rxjs/operators';

@Injectable()
export class PromptUpdateEffects {
  @Effect({ dispatch: false })
  update$ = this.updates.available.pipe(
    switchMap(() =>
      this.snackbar.open('New version available', 'Update', { duration: 3000 }).afterDismissed(),
    ),
    filter(({ dismissedByAction }) => dismissedByAction),
    tap(() => this.updates.activateUpdate().then(() => this.document.location.reload())),
  );

  constructor(
    private updates: SwUpdate,
    private snackbar: MatSnackBar,
    @Inject(DOCUMENT) private document: Document,
  ) {}
}
