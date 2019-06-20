import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterState, StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { reducer } from './+state/reducer';
import { provider } from './+state/serializer';

@NgModule({
  imports: [
    CommonModule,
    StoreRouterConnectingModule.forRoot({ routerState: RouterState.Minimal }),
    StoreModule.forFeature('router', reducer),
  ],
  providers: [provider],
})
export class StateRouterModule {}
