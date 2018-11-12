import { Injectable } from '@angular/core';
import { User } from '@nx-mean-starter/models';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  login(login: string, password: string): Observable<{ user: User; jwt: string }> {
    if (login === 'test' && password === 'test') {
      return of({ user: { email: 'mail@test.com' }, jwt: 'abc123' }).pipe(delay(500));
    }
    return throwError('not authenticated');
  }

  logout(): Observable<void> {
    return of(null).pipe(delay(500));
  }
}
