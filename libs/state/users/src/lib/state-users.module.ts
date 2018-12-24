import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AuthInterceptor } from '@nx-mean-starter/state/auth';
import { EntitiesEffects, reducerProvider, reducerToken } from './+state';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('users', reducerToken),
    EffectsModule.forFeature([EntitiesEffects]),
  ],
  providers: [reducerProvider, AuthInterceptor.provider],
})
export class StateUsersModule {}
