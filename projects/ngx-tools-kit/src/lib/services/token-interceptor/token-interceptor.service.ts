import { HttpHandlerFn, HttpRequest } from '@angular/common/http';
import type { NtkTokenInterceptorFactory } from './token-interceptor.type';

export const ntkTokenInterceptor: NtkTokenInterceptorFactory = (tokenGetter: () => string) => {
  return (request: HttpRequest<unknown>, next: HttpHandlerFn) => {
    const token = tokenGetter();
    if (!token) return next(request);

    return next(
      request.clone({
        setHeaders: { Authorization: `Bearer ${token}` },
      })
    );
  };
};
