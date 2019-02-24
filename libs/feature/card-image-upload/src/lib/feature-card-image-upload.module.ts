import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { ReactiveFormsModule } from '@angular/forms';
import { FeatureCardImageModule } from '@nx-mean-starter/feature/card-image';
import { SharedModule } from '@nx-mean-starter/shared';
import { CardImageUploadComponent } from './card-image-upload/card-image-upload.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FeatureCardImageModule,
    AngularFireStorageModule,
  ],
  declarations: [CardImageUploadComponent],
  exports: [CardImageUploadComponent],
})
export class FeatureCardImageUploadModule {}
