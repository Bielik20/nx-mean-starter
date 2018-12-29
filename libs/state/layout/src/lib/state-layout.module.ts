import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { Effects } from '../../../auth/src/lib/+state/effects';
import { reducer } from './+state/reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('layout', reducer),
    EffectsModule.forFeature([Effects]),
  ],
})
export class StateLayoutModule {}
