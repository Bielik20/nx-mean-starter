import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@nx-mean-starter/shared';
import { CardImageUploadComponent } from './card-image-upload/card-image-upload.component';

@NgModule({
  imports: [CommonModule, SharedModule, ReactiveFormsModule],
  declarations: [CardImageUploadComponent],
  exports: [CardImageUploadComponent],
})
export class FeatureCardImageUploadModule {}
