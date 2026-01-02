import { HttpInterceptorFn } from '@angular/common/http';

export type NtkTokenInterceptorFactory = (tokenGetter: () => string) => HttpInterceptorFn;
