import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SharedService } from '../../shared/service/shared.service';


@Injectable()
export class handleErrorInterceptor implements HttpInterceptor {
  constructor(private toastService: SharedService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const skipError = request.headers.get('X-Skip-Error');
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'An unexpected error occurred'; // main message
        let errorType: 'success' | 'error' | 'warning' = 'error';
        if(!skipError){
        if (error.status === 401) {
          errorMessage = 'Unauthorized! Please login.';
        } else if (error.status === 403) {
          errorMessage = 'Access Denied! You don’t have permission.';
        } else if (error.status === 500) {
          errorMessage = 'Internal Server Error! Please try again later.';
        } else if (error.status === 400) {
          errorMessage = 'Please check your input.';
          errorType = 'warning';
        } else if (error.status === 409) {
          errorMessage = 'Email already exists! Try logging in.';
        }

        this.toastService.show(errorMessage, errorType);
        }
        console.error('HTTP Error:', error); // type od error
        return throwError(() => error);
      })
    );
  }
}
