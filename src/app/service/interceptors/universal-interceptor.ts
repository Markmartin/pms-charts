import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';

import { Observable } from 'rxjs';

export class UniversalInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const universalReq = req.clone({
      setHeaders: {
        'x-access-token': localStorage.getItem('token') || '',
        roleCode: 'roleCode',
        observe: 'response',
      },
    });
    return next.handle(universalReq);
  }
}
