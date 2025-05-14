import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';


@Injectable({
  providedIn: 'root',
})
export class isloggedGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token =  localStorage.getItem('token')
      if (token) {
        return false;
      } else {
        return true;
      }
    }
  }
