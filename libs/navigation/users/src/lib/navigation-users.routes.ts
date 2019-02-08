import { Routes } from '@angular/router';
import { AuthGuard } from '@nx-mean-starter/feature/auth';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserComponent } from './user/user.component';
import { UsersComponent } from './users/users.component';

export const NAVIGATION_USERS_ROUTES: Routes = [
  { path: '', pathMatch: 'full', component: UsersComponent, canActivate: [AuthGuard] },
  { path: ':id', pathMatch: 'full', component: UserComponent },
  { path: ':id/edit', pathMatch: 'full', component: UserEditComponent, canActivate: [AuthGuard] },
];
