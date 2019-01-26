import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@nx-mean-starter/shared';
import { NgxAuthFirebaseUIModule } from 'ngx-auth-firebaseui';
import { AuthModalPageComponent } from './pages';

@NgModule({
  imports: [CommonModule, SharedModule, ReactiveFormsModule, NgxAuthFirebaseUIModule],
  declarations: [AuthModalPageComponent],
  entryComponents: [AuthModalPageComponent],
})
export class FeatureAuthModule {}
