import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FeatureCardImageUploadModule } from '@nx-mean-starter/feature/card-image-upload';
import { SharedModule } from '@nx-mean-starter/shared';
import { NAVIGATION_USERS_ROUTES } from './navigation-users.routes';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserComponent } from './user/user.component';
import { UsersComponent } from './users/users.component';

@NgModule({
  declarations: [UsersComponent, UserComponent, UserEditComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(NAVIGATION_USERS_ROUTES),
    ReactiveFormsModule,
    FeatureCardImageUploadModule,
  ],
})
export class NavigationUsersModule {}
