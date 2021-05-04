import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthHeadersInterceptor implements HttpInterceptor {

  constructor(private _authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(this._authService.isLoggedIn()){
      request = request.clone({
        setHeaders: {
          'Authorization': "Basic " + sessionStorage.getItem('token'),
          // 'Content-Type': "application/x-www-form-urlencoded"
        }
      })
    }
    return next.handle(request);
  }
}
