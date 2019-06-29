import {
  HTTP_INTERCEPTORS,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable, Provider } from '@angular/core';
import { environment } from '@env/frontend';
import { Observable } from 'rxjs';

/** Passes HttpErrorResponse to application-wide error handler */
@Injectable()
export class HttpUrlInterceptor implements HttpInterceptor {
  static provider: Provider = {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpUrlInterceptor,
    multi: true,
  };

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.url.startsWith('api/')) {
      const requestCopy = request.clone({
        url: `${environment.apiUrl}/${request.url}`,
      });
      return next.handle(requestCopy);
    }

    return next.handle(request);
  }
}
