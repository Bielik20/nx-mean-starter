import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StateAuthModule } from '@nx-mean-starter/state/auth';
import { StatePostsModule } from '@nx-mean-starter/state/posts';
import { StateRouterModule } from '@nx-mean-starter/state/router';

import { reducerProvider, reducerToken } from './+state/reducer';
import { SelectEffects } from './+state/select.effects';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forRoot(reducerToken),
    EffectsModule.forRoot([SelectEffects]),
    StateAuthModule,
    StateRouterModule,
    StatePostsModule,
  ],
  providers: [reducerProvider],
})
export class StateRootModule {}
