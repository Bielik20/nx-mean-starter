/* tslint:disable:no-unused-variable */
import { inject, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { AuthInterceptor } from './auth.interceptor';

describe('Service: AuthInterceptor', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthInterceptor, { provide: Store, useValue: { select: jest.fn() } }],
    });
  });

  it('should ...', inject([AuthInterceptor], (service: AuthInterceptor) => {
    expect(service).toBeTruthy();
  }));
});
