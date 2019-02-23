import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@nx-mean-starter/shared';
import { CardImageComponent } from './card-image/card-image.component';

@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [CardImageComponent],
  exports: [CardImageComponent],
})
export class FeatureCardImageModule {}
