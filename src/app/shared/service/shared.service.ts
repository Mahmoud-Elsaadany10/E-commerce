import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  showToast = false;
  toastMessage = '';
  toastType: 'success' | 'error' | 'warning' | "light" = 'success';

  private _loading = new BehaviorSubject<boolean>(false);
  public loading$ = this._loading.asObservable();
  private requestCount = 0;



  constructor(private _http : HttpClient) {

  }



  show(message: string, type: 'success' | 'error' | 'warning' | 'light' = 'success') {
    this.toastMessage = message;
    this.toastType = type;
    this.showToast = true;

    setTimeout(() => {
      this.showToast = false;
    }, 3000);
  }

  appear() {
    this.requestCount++;
    this._loading.next(true);
  }

  hide() {
    this.requestCount--;
    if (this.requestCount <= 0) {
      this._loading.next(false);
      this.requestCount = 0;
    }
  }
}
