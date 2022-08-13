import { Observable } from 'rxjs';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  /**
   * Injectable interceptor to intercept any http-request made and attach
   * captured cookies to the request (to make sure cookie-based auth works on server).
   */
  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
        withCredentials: true
    });
    return next.handle(request);
  }
}