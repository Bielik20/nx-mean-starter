import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { NxModule } from '@nrwl/nx';
import { CoreModule } from '@nx-mean-starter/core';
import { SharedModule } from '@nx-mean-starter/shared';
import { StateRootModule } from '@nx-mean-starter/state/root';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NxModule.forRoot(),
    RouterModule.forRoot(
      [
        {
          path: 'posts',
          loadChildren:
            '@nx-mean-starter/navigation/posts#NavigationPostsModule'
        }
      ],
      { initialNavigation: 'enabled' }
    ),
    SharedModule.forRoot(),
    CoreModule,
    StateRootModule,
    StoreDevtoolsModule.instrument({
      name: 'web-app',
      logOnly: environment.production
    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
