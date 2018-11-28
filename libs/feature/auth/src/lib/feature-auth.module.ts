import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@nx-mean-starter/shared';
import { AuthPageComponent } from './pages/auth-page/auth-page.component';

@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [AuthPageComponent],
  exports: [AuthPageComponent],
})
export class FeatureAuthModule {}
