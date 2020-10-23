import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICategory } from '../modules/product';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  baseUrl = 'https://localhost:44309/api/';
  constructor(private http: HttpClient) { }

  upsertCategory(model: any){
    let headers = new HttpHeaders();
    const token = localStorage.getItem('token');
    headers = headers.set('Authorization', `Bearer ${token}`);
    console.log(token);
    return  this.http.post<ICategory>(this.baseUrl + 'Category/Upsert', model ,  { headers });
  }

  getUsers() {
    let headers = new HttpHeaders();
    const token = localStorage.getItem('token');
    headers = headers.set('Authorization', `Bearer ${token}`);
    return this.http.get(this.baseUrl + 'User/GetAll', { headers });
  }
}
