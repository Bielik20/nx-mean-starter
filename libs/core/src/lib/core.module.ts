import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@nx-mean-starter/shared';

import { LayoutComponent } from './layout/layout.component';

@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [LayoutComponent],
  exports: [LayoutComponent],
})
export class CoreModule {}
