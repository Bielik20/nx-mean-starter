import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AuthInterceptor, AuthState } from '@nx-mean-starter/state/auth';
import { EntitiesEffects } from './+state/entities/effects';
import { reducerProvider, reducerToken } from './+state/reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('users', reducerToken, {
      metaReducers: [AuthState.logoutMetaReducer],
    }),
    EffectsModule.forFeature([EntitiesEffects]),
  ],
  providers: [reducerProvider, AuthInterceptor.provider],
})
export class StateUsersModule {}
