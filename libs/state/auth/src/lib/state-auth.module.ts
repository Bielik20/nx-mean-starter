import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { Effects } from './+state/effects';
import { logoutMetaReducer, reducer } from './+state/reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('auth', reducer, {
      metaReducers: [logoutMetaReducer],
    }),
    EffectsModule.forFeature([Effects]),
  ],
  providers: [],
})
export class StateAuthModule {}
