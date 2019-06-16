import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { DropzoneDirective } from './directives/dropzone.directive';
import { fontawesomeImports } from './fontawesome/fontawesome-imports';

fontawesomeImports();

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    AngularMaterialModule,
    InfiniteScrollModule,
    FontAwesomeModule,
  ],
  declarations: [DropzoneDirective],
  exports: [
    HttpClientModule,
    AngularMaterialModule,
    DropzoneDirective,
    InfiniteScrollModule,
    FontAwesomeModule,
  ],
})
export class SharedModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [],
    };
  }
}
