import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { RegisterUser, ApiResponse, LoginUser } from '../../model/models';
import {jwtDecode} from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class RegServeService {
  userData = new BehaviorSubject<any>(null);

  constructor(private _http: HttpClient) {
    if (this.getToken()) {
      this.saveUser();
    }
  }


  saveUser() {
    const token = this.getToken();
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        this.userData.next(decodedToken);
        console.log(decodedToken);
      } catch (error) {
        console.error('Invalid token:', error);
        this.logout();
      }
    }
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken');
  }

  isTokenExpired(): boolean {
    const token = this.getToken();
    if (!token) return true;

    try {
      const decoded: any = jwtDecode(token);
      const exp = decoded.exp;
      const now = Math.floor(Date.now() / 1000);
      return now >= exp;
    } catch (e) {
      return true;
    }
  }

  refreshToken(): Observable<any> {
    return this._http.post(`${environment.mainUrl}/Account/RefreshToken`, {
      token: this.getToken(),
      refreshToken: this.getRefreshToken()
    });
  }

  login(user: LoginUser): Observable<any> {
    return this._http.post<any>(`${environment.mainUrl}/Account/Login`, user);
  }

  signup(regUser: RegisterUser): Observable<ApiResponse> {
    return this._http.post<ApiResponse>(`${environment.mainUrl}/Account/Register`, regUser);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    this.userData.next(null);
  }
}
