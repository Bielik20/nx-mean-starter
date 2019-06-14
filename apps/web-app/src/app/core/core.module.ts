import { CommonModule } from '@angular/common';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FeatureAuthModule } from '@nx-mean-starter/feature/auth';
import { SharedModule } from '@nx-mean-starter/shared';
import {
  FooterComponent,
  LayoutComponent,
  NavbarComponent,
  UserSidenavCardComponent,
} from './layout/components';
import { LayoutPageComponent, SidenavPageComponent } from './layout/pages';

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
