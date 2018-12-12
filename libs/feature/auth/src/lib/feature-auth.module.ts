import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@nx-mean-starter/shared';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthModalPageComponent } from './pages/auth-modal-page/auth-modal-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';

@NgModule({
  imports: [CommonModule, SharedModule, ReactiveFormsModule],
  declarations: [
    LoginComponent,
    LoginPageComponent,
    AuthModalPageComponent,
    RegisterPageComponent,
    RegisterComponent,
  ],
  entryComponents: [AuthModalPageComponent],
})
export class FeatureAuthModule {}
