import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@nx-mean-starter/shared';

import { BannerComponent } from './banner/banner.component';

@NgModule({
  declarations: [BannerComponent],
  imports: [CommonModule, SharedModule],
  exports: [BannerComponent],
})
export class FeatureBannerModule {}
