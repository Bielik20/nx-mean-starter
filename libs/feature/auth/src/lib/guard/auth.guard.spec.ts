import { TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthState } from '@nx-mean-starter/state/auth';
import { RouterState } from '@nx-mean-starter/state/router';
import { StoreStub } from '@nx-mean-starter/testing';
import { Observable, of } from 'rxjs';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let store: StoreStub;
  let beforeClosed: () => Observable<boolean>;

  beforeEach(() => {
    const matDialogStub = {
      open: jest.fn(() => ({ beforeClosed })),
    };

    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        StoreStub.provider,
        { provide: MatDialog, useValue: matDialogStub },
        { provide: Router, useValue: { navigate: jest.fn() } },
      ],
    });

    guard = TestBed.get(AuthGuard);
    store = TestBed.get(Store);
    store.overrideSelector(AuthState.getReady, true);
  });

  it('should ...', () => {
    expect(guard).toBeTruthy();
  });

  it('should pass', done => {
    store.overrideSelector(AuthState.getAuthenticated, true);
    guard.canActivate(null, null).subscribe(pass => {
      expect(pass).toBe(true);
      done();
    });
  });

  describe('first route', () => {
    beforeEach(() => {
      store.overrideSelector(AuthState.getAuthenticated, false);
      store.overrideSelector(RouterState.getNavigationId, 1);
    });

    it('should fail with first route', done => {
      const next: any = { url: [{ path: '/test-path', parameters: {} }] };
      guard.canActivate(next, null).subscribe(pass => {
        expect(pass).toBe(false);
        done();
      });
    });
  });

  describe('modal', () => {
    beforeEach(() => {
      store.overrideSelector(AuthState.getAuthenticated, false);
      store.overrideSelector(RouterState.getNavigationId, 2);
    });

    it('should fail', done => {
      beforeClosed = () => of(false);
      guard.canActivate(null, null).subscribe(pass => {
        expect(pass).toBe(false);
        done();
      });
    });

    it('should pass', done => {
      beforeClosed = () => of(true);
      guard.canActivate(null, null).subscribe(pass => {
        expect(pass).toBe(true);
        done();
      });
    });
  });
});
