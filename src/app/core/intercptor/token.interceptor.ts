import { Injectable } from '@angular/core';
import {
  HttpInterceptor, HttpRequest, HttpHandler, HttpEvent
} from '@angular/common/http';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { RegServeService } from '../../registration/service/reg-serve.service';


@Injectable()
export class tokenInterceptor implements HttpInterceptor {

  private isRefreshing = false;

  constructor(private authService: RegServeService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();

    // Token expired: try to refresh
    if (token && this.authService.isTokenExpired() && !this.isRefreshing) {
      this.isRefreshing = true;

      return this.authService.refreshToken().pipe(
        switchMap((res: any) => {
          this.isRefreshing = false;
          if (res?.token && res?.refreshToken) {
            localStorage.setItem('token', res.token);
            localStorage.setItem('refreshToken', res.refreshToken);
            this.authService.saveUser();

            const cloned = req.clone({
              setHeaders: { Authorization: `Bearer ${res.token}` }
            });
            return next.handle(cloned);
          } else {
            return throwError(() => new Error('Failed to refresh token'));
          }
        }),
        catchError((err) => {
          this.isRefreshing = false;
          this.authService.logout();
          return throwError(() => err);
        })
      );
    }

    // Token valid or missing — just attach it
    const cloned = token ? req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    }) : req;

    return next.handle(cloned);
  }
}
