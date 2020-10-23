import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { startWith } from 'rxjs/operators';
import { ICategory, IProduct } from '../modules/product';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  baseUrl = 'https://localhost:44309/api/';
  products: IProduct[];

  constructor(private http: HttpClient) {
    
  }

  getProducts(): any{
    return this.http.get<IProduct[]>(this.baseUrl + 'Product');
  }


  getProductById(value: any): any {
    return this.http.get<IProduct>(this.baseUrl + 'Product/' + value);
  }

  getCategories(): any {
    return this.http.get<ICategory[]>(this.baseUrl + 'Category');
  }

  getCategoriesById(value: any): any {
    return this.http.get<ICategory>(this.baseUrl + 'Category/Id=' + value);
  }

  searchForProduct(value: string): any {
    return this.http.get<IProduct[]>(
      this.baseUrl + 'Product/search?name=' + value
    );
  }
}
