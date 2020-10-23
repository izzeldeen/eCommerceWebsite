import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, ReplaySubject } from 'rxjs';
import { IUser } from '../modules/user';
@Injectable({
  providedIn: 'root',
})
export class AccountService {
  baseUrl = 'https://localhost:44309/api/';
  private currentUserSource = new ReplaySubject<IUser>(1);
  currentUser$ = this.currentUserSource.asObservable();
  user: IUser;
  constructor(private http: HttpClient) {}
  Login(login: any): any {
    return this.http.post<IUser>(this.baseUrl + 'Account/Login', login);
  }
  Register(register: any): any {
    return this.http.post<IUser>(this.baseUrl + 'Account/Register', register);
  }
  checkEmailExists(value): any {
    return this.http.get(this.baseUrl + 'Account/emailexists?email=' + value);
  }
  getUser(): any {
    let headers = new HttpHeaders();
    const token = localStorage.getItem('token');
    headers = headers.set('Authorization', `Bearer ${token}`);
    return this.http.get<IUser>(this.baseUrl + 'Account/GetUser', { headers });
  }
  logOut(): any{
    localStorage.setItem('token' , null);
  }
}
