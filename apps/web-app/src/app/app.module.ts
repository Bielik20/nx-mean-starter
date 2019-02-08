import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { NxModule } from '@nrwl/nx';
import { CoreModule } from '@nx-mean-starter/core';
import { SharedModule } from '@nx-mean-starter/shared';
import { StateRootModule } from '@nx-mean-starter/state/root';
import { NgxAuthFirebaseUIModule } from 'ngx-auth-firebaseui';
import { environment } from '../environments/environment';
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
    NxModule.forRoot(),
    RouterModule.forRoot(APP_ROUTES, { initialNavigation: 'enabled' }),
    SharedModule.forRoot(),
    CoreModule,
    StateRootModule,
    StoreDevtoolsModule.instrument({
      name: 'web-app',
      logOnly: environment.production,
    }),
    AngularFireModule.initializeApp(environment.firebase),
    NgxAuthFirebaseUIModule.forRoot(environment.firebase, appFactoryName, {
      enableFirestoreSync: false,
      onlyEmailPasswordAuth: false,
      toastMessageOnAuthSuccess: true,
      toastMessageOnAuthError: true,
    }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
