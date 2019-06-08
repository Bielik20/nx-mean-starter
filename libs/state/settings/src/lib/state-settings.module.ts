import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { reducer } from './+state/reducer';

@NgModule({
  imports: [CommonModule, StoreModule.forFeature('settings', reducer)],
})
export class StateSettingsModule {}
