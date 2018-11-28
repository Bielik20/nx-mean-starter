import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FeatureAuthModule } from '@nx-mean-starter/feature/auth';
import { SharedModule } from '@nx-mean-starter/shared';
import { LayoutComponent } from './layout/layout.component';

@NgModule({
  imports: [CommonModule, SharedModule, FeatureAuthModule],
  declarations: [LayoutComponent],
  exports: [LayoutComponent],
})
export class CoreModule {}
