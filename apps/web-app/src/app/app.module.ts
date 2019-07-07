import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '@env/frontend';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { NxModule } from '@nrwl/angular';
import { FeatureLayoutModule } from '@nx-mean-starter/feature/layout';
import { AppErrorHandler, HttpErrorInterceptor, SharedModule } from '@nx-mean-starter/shared';
import { AuthInterceptor } from '@nx-mean-starter/state/auth';
import { StateRootModule } from '@nx-mean-starter/state/root';
import { NgxAuthFirebaseUIModule } from 'ngx-auth-firebaseui';
import { AppComponent } from './app.component';
import { APP_ROUTES } from './app.routes';
import { HomePageComponent } from './home-page/home-page.component';

export function appFactoryName() {
  return 'nx-mean-starter';
}

@NgModule({
  declarations: [AppComponent, HomePageComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    NxModule.forRoot(),
    SharedModule.forRoot(),
    StateRootModule,
    StoreDevtoolsModule.instrument({
      name: 'web-app',
      logOnly: environment.production,
    }),
    AngularFireModule.initializeApp(environment.firebase),
    NgxAuthFirebaseUIModule.forRoot(environment.firebase, appFactoryName, {
      enableFirestoreSync: false,
    }),
    RouterModule.forRoot(APP_ROUTES, { initialNavigation: 'enabled' }),
    FeatureLayoutModule,
  ],
  providers: [AppErrorHandler.provider, HttpErrorInterceptor.provider, AuthInterceptor.provider],
  bootstrap: [AppComponent],
})
export class AppModule {}
