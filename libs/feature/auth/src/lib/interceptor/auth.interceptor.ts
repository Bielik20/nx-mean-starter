import {
  HTTP_INTERCEPTORS,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable, Provider } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthState } from '@nx-mean-starter/state/auth';
import { Observable } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptor implements HttpInterceptor {
  static provider: Provider = {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  };

  constructor(private store: Store<AuthState.State>) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.store.select(AuthState.getJwt).pipe(
      take(1),
      switchMap(jwt => {
        const authHeader = `Bearer ${jwt}`;
        const authReq = req.clone({ setHeaders: { Authorization: authHeader } });
        return next.handle(req);
      }),
    );
  }
}
