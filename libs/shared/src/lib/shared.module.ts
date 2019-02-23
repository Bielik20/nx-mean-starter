import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { DropzoneDirective } from './directives/dropzone.directive';

@NgModule({
  imports: [CommonModule, HttpClientModule, AngularMaterialModule],
  declarations: [DropzoneDirective],
  exports: [HttpClientModule, AngularMaterialModule, DropzoneDirective],
})
export class SharedModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [],
    };
  }
}
