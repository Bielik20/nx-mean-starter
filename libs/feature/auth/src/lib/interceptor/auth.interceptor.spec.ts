/* tslint:disable:no-unused-variable */
import { inject, TestBed } from '@angular/core/testing';
import { AuthInterceptor } from './auth.interceptor';

describe('Service: AuthInterceptor', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthInterceptor],
    });
  });

  it('should ...', inject([AuthInterceptor], (service: AuthInterceptor) => {
    expect(service).toBeTruthy();
  }));
});
