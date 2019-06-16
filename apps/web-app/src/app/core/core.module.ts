import { CommonModule } from '@angular/common';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FeatureAuthModule } from '@nx-mean-starter/feature/auth';
import { SharedModule } from '@nx-mean-starter/shared';
import { FooterComponent } from './components/footer/footer.component';
import { LayoutComponent } from './components/layout/layout.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UserSidenavCardComponent } from './components/user-sidenav-card/user-sidenav-card.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { SidenavPageComponent } from './pages/sidenav-page/sidenav-page.component';

@NgModule({
  imports: [CommonModule, SharedModule, FeatureAuthModule, RouterModule],
  declarations: [
    LayoutComponent,
    LayoutPageComponent,
    NavbarComponent,
    UserSidenavCardComponent,
    SidenavPageComponent,
    FooterComponent,
  ],
  exports: [LayoutPageComponent],
})
export class CoreModule {
  /* make sure CoreModule is imported only by one NgModule the AppModule */
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import only in AppModule');
    }
  }
}
