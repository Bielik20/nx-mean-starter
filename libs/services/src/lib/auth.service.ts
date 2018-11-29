import { Injectable } from '@angular/core';
import { Login, Register, User } from '@nx-mean-starter/models';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  login(model: Login): Observable<{ user: User; jwt: string }> {
    if (model.email === 'test@test.com' && model.password === 'aaa123') {
      return of({ user: { _id: 'test', email: 'test@test.com' }, jwt: 'abc123' }).pipe(delay(500));
    }
    return throwError('not authenticated');
  }

  register(model: Register): Observable<{ user: User; jwt: string }> {
    if (model.email === 'test@test.com' && model.password === 'aaa123') {
      return of({ user: { _id: 'test', email: 'test@test.com' }, jwt: 'abc123' }).pipe(delay(500));
    }
    return throwError('not registered');
  }
}
