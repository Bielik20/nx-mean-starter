import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthState } from '@nx-mean-starter/state/auth';
import { RouterState } from '@nx-mean-starter/state/router';
import { combineLatest, Observable, of } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
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
    ).pipe(
      take(1),
      switchMap(([authenticated, navigationId]) => {
        if (authenticated === true) {
          return of(true);
        }
        if (navigationId === 1) {
          const path = next.url[0].path;
          const parameters = next.url[0].parameters;
          this.redirectHomeThenReroute(path, parameters);
          return of(false);
        }
        return this.openAndListenAuthModal();
      }),
    );
  }

  private async redirectHomeThenReroute(path: string, parameters: {}) {
    await this.router.navigate(['/']);
    this.router.navigate([path, parameters]);
  }

  private openAndListenAuthModal() {
    return this.dialog.open(AuthModalPageComponent).beforeClosed();
  }
}
