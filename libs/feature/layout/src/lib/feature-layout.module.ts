import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FeatureAuthModule } from '@nx-mean-starter/feature/auth';
import { SharedModule } from '@nx-mean-starter/shared';
import { FooterComponent } from './components/footer/footer.component';
import { LayoutComponent } from './components/layout/layout.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UserSidenavCardComponent } from './components/user-sidenav-card/user-sidenav-card.component';
import { SidenavPageComponent } from './pages/sidenav-page/sidenav-page.component';

@NgModule({
  imports: [CommonModule, SharedModule, FeatureAuthModule, RouterModule],
  declarations: [
    LayoutComponent,
    NavbarComponent,
    UserSidenavCardComponent,
    SidenavPageComponent,
    FooterComponent,
  ],
  exports: [LayoutComponent, NavbarComponent, SidenavPageComponent, FooterComponent],
})
export class FeatureLayoutModule {}
