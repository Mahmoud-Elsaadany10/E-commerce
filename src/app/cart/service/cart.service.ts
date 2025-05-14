import { Injectable } from '@angular/core';
import {  orderId, OrderItem, Product } from '../../model/models';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class CartService {

  constructor(private _http:HttpClient){}

  sendToCart(  quantity: number,
  productId: number):Observable<any>{
    return this._http.post(`${environment.mainUrl}/Cart`,{quantity,productId},
      { headers: { 'X-Skip-Error': 'true' } });

  }

  getCart():Observable<any>{
    return this._http.get<any>(`${environment.mainUrl}/Cart`,
      { headers: { 'X-Skip-Error': 'true' } });
  }

  deleteCart(id:number):Observable<any>{
    return this._http.delete(`${environment.mainUrl}/Cart/${id}`,
      { headers: { 'X-Skip-Error': 'true' } })
  }
UpdateCart(productId: number, quantity: number): Observable<any> {
  return this._http.put(`${environment.mainUrl}/Cart`, { quantity, productId },
      { headers: { 'X-Skip-Error': 'true' } });
}
  payment(id :orderId):Observable<any>{
    return this._http.post<any>(`${environment.mainUrl}/Payments/create-checkout-session`,id)
  }

  confirmOrder():Observable<any>{
    return this._http.post<any>(`${environment.mainUrl}/Order/ConfirmOrder`,{})
  }

}

