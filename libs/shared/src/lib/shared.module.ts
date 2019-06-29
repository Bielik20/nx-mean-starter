import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { DropzoneDirective } from './directives/dropzone.directive';
import { AngularMaterialModule } from './ui/angular-material.module';
import { fontawesomeImports } from './ui/fontawesome-imports';

fontawesomeImports();

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    AngularMaterialModule,
    InfiniteScrollModule,
    FontAwesomeModule,
    LazyLoadImageModule,
  ],
  declarations: [DropzoneDirective],
  exports: [
    HttpClientModule,
    AngularMaterialModule,
    DropzoneDirective,
    InfiniteScrollModule,
    FontAwesomeModule,
    LazyLoadImageModule,
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
