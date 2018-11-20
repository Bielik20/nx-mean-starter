import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FeatureBannerModule } from '@nx-mean-starter/feature/banner';
import { SharedModule } from '@nx-mean-starter/shared';
import { UsersComponent } from './users/users.component';

@NgModule({
  declarations: [UsersComponent],
  imports: [
    CommonModule,
    SharedModule,
    FeatureBannerModule,
    RouterModule.forChild([{ path: '', pathMatch: 'full', component: UsersComponent }]),
  ],
})
export class NavigationUsersModule {}
