import { Injectable } from '@angular/core';
import { ApiResponse, CategoryResponse, Product, ProductResponse } from '../../model/models';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';


@Injectable({ providedIn: 'root' })
export class ProductService {
  constructor(private _http: HttpClient) {}

  getAllProducts(pageNumber : number): Observable<ProductResponse> {
    return this._http.get<ProductResponse>(`${environment.mainUrl}/Product?PageNumber=${pageNumber}&PageSize=9`);
  }

  getProductById(id: number): Observable<ApiResponse> {
    return this._http.get<ApiResponse>(`${environment.mainUrl}/Product/${id}`);
  }

  getFilteredProducts(page: number, minPrice: number, maxPrice: number, sortBy: string, sortDirection: string, categoryName: string): Observable<ProductResponse> {
  let url = `${environment.mainUrl}/Product/Filtering?PageNumber=${page}&PageSize=9`;

  if (minPrice !== null) url += `&minPrice=${minPrice}`;
  if (maxPrice !== null) url += `&maxPrice=${maxPrice}`;
  if (sortBy) url += `&SortBy=${sortBy}`;
  if (sortDirection) url += `&SortDirection=${sortDirection}`;
  if (categoryName) url += `&CategoryName=${categoryName}`;

  return this._http.get<ProductResponse>(url);
}
  getCategory(): Observable<CategoryResponse>{
    return this._http.get<CategoryResponse>(`${environment.mainUrl}/Category`);
  }
  searchByName(name: string, pageNumber: number): Observable<ProductResponse> {
    return this._http.get<ProductResponse>(`${environment.mainUrl}/Product/Filtering?ProductName=${name}`,
      { headers: { 'X-Skip-Error': 'true' } });
  }
}
