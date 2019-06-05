import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthState } from '@nx-mean-starter/state/auth';
import { RouterState } from '@nx-mean-starter/state/router';
import { combineLatest, Observable, of } from 'rxjs';
import { filter, switchMap, take } from 'rxjs/operators';
import { AuthModalPageComponent } from '../pages';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private store: Store<AuthState.State | RouterState.State>,
    private dialog: MatDialog,
    private router: Router,
  ) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return combineLatest(
      this.store.select(AuthState.getAuthenticated),
      this.store.select(RouterState.getNavigationId),
      this.store.select(AuthState.getReady),
    ).pipe(
      filter(([a, b, ready]) => ready === true),
      take(1),
      switchMap(([authenticated, navigationId]) => {
        if (authenticated === true) {
          return of(true);
        }
        if (navigationId === 1) {
          this.redirectHomeThenReroute(state.url);
          return of(false);
        }
        return this.openAndListenAuthModal();
      }),
    );
  }

  private async redirectHomeThenReroute(url: string) {
    await this.router.navigate(['/']);
    this.router.navigateByUrl(url);
  }

  private openAndListenAuthModal() {
    return this.dialog.open(AuthModalPageComponent).beforeClosed();
  }
}
