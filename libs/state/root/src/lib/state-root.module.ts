import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StateAuthModule } from '@nx-mean-starter/state/auth';
import { StateLayoutModule } from '@nx-mean-starter/state/layout';
import { StateRouterModule } from '@nx-mean-starter/state/router';
import { StateUsersModule } from '@nx-mean-starter/state/users';
import { reducerProvider, reducerToken } from './+state/reducer';
import { SelectEffects } from './+state/select.effects';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forRoot(reducerToken),
    EffectsModule.forRoot([SelectEffects]),
    StateAuthModule,
    StateRouterModule,
    StateUsersModule,
    StateLayoutModule,
  ],
  providers: [reducerProvider],
})
export class StateRootModule {}
