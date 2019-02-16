import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { Effects } from './+state/effects';
import { reducer } from './+state/reducer';
import { provider } from './+state/serializer';

@NgModule({
  imports: [
    CommonModule,
    StoreRouterConnectingModule.forRoot(),
    StoreModule.forFeature('router', reducer),
    EffectsModule.forFeature([Effects]),
  ],
  providers: [provider],
})
export class StateRouterModule {}
