import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TransferState } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { StateAuthModule } from '@nx-mean-starter/state/auth';
import { StateLayoutModule } from '@nx-mean-starter/state/layout';
import { StateRouterModule } from '@nx-mean-starter/state/router';
import { StateUsersModule } from '@nx-mean-starter/state/users';
import { reducerProvider, reducerToken } from './+state/reducer';
import { SelectEffects } from './+state/select.effects';
import { metaReducers, NGRX_STATE } from './+state/universal';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forRoot(reducerToken, { metaReducers }),
    EffectsModule.forRoot([SelectEffects]),
    StateAuthModule,
    StateRouterModule,
    StateUsersModule,
    StateLayoutModule,
  ],
  providers: [reducerProvider],
})
export class StateRootModule {
  public constructor(
    private readonly transferState: TransferState,
    private readonly store: Store<any>,
  ) {
    const isBrowser = this.transferState.hasKey<any>(NGRX_STATE);

    if (isBrowser) {
      this.onBrowser();
    } else {
      this.onServer();
    }
  }
  onServer() {
    this.transferState.onSerialize(NGRX_STATE, () => {
      let state;
      this.store
        .subscribe((saveState: any) => {
          console.log('Set for browser', JSON.stringify(saveState));
          state = saveState;
        })
        .unsubscribe();

      return state;
    });
  }

  onBrowser() {
    const state = this.transferState.get<any>(NGRX_STATE, null);
    this.transferState.remove(NGRX_STATE);
    this.store.dispatch({ type: 'SET_ROOT_STATE', payload: state });
    console.log('Got state from server', JSON.stringify(state));
  }
}
