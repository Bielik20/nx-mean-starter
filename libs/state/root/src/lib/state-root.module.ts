import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { environment } from '@env/frontend';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StateAuthModule } from '@nx-mean-starter/state/auth';
import { StateLayoutModule } from '@nx-mean-starter/state/layout';
import { StateRouterModule } from '@nx-mean-starter/state/router';
import { StateUsersModule } from '@nx-mean-starter/state/users';
import { metaReducers } from './+state/meta-reducers';
import { reducerProvider, reducerToken } from './+state/reducer';
import { SelectEffects } from './+state/select.effects';
import { PromptUpdateEffects } from './+state/update-app.effects';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forRoot(reducerToken, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: !environment.production,
        strictActionImmutability: !environment.production,
        strictStateSerializability: !environment.production,
        strictActionSerializability: !environment.production,
      },
    }),
    EffectsModule.forRoot([SelectEffects, PromptUpdateEffects]),
    StateAuthModule,
    StateRouterModule,
    StateUsersModule,
    StateLayoutModule,
  ],
  providers: [reducerProvider],
})
export class StateRootModule {}
