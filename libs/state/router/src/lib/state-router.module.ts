import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { reducer } from './+state/reducer';
import { provider } from './+state/serializer';

@NgModule({
  imports: [
    CommonModule,
    StoreRouterConnectingModule.forRoot(),
    StoreModule.forFeature('router', reducer),
  ],
  providers: [provider],
})
export class StateRouterModule {}
