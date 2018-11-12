import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { AngularMaterialModule } from './angular-material/angular-material.module';

@NgModule({
  imports: [CommonModule, HttpClientModule, AngularMaterialModule],
  exports: [HttpClientModule, AngularMaterialModule],
})
export class SharedModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [],
    };
  }
}
