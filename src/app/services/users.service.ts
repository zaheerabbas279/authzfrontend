import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieStore } from 'src/shared/helpers/CookieStore';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  _baseURL = "http://localhost:3100/";
  constructor(private http: HttpClient) { }

  getAllUsers() {
    let headers = new HttpHeaders().set('Authorization', `Bearer ${CookieStore.getToken()}`)
    return this.http.get(this._baseURL + "user/listall", ({ headers }));
  }

  addNewUsers(payload: any) {
    let headers = new HttpHeaders().set('Authorization', `Bearer ${CookieStore.getToken()}`)
    return this.http.post(this._baseURL + "user/addnew", payload, ({ headers }));
  }

  getUserById(id: any) {
    let headers = new HttpHeaders().set('Authorization', `Bearer ${CookieStore.getToken()}`)
    return this.http.get(this._baseURL + `user/${id}`, ({ headers }));
  }

  updateUserById(id: any, payload: any) {
    let headers = new HttpHeaders().set('Authorization', `Bearer ${CookieStore.getToken()}`)
    return this.http.put(this._baseURL + `user/${id}`, payload, ({ headers }));
  }
}
