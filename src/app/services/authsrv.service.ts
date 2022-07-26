import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthsrvService {

  // _baseURL = "http://localhost:4000/";
  _baseURL = "https://nodeauthbackend.herokuapp.com/";
  constructor(private http: HttpClient, private router: Router) { }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  setRefreshToken(token: string): void {
    localStorage.setItem('refresh-token', token);
  }

  getToken(): String | null {
    return localStorage.getItem('token');
  }

  isLoggedIn() {
    console.log('got token', localStorage.getItem('token'));
    return this.getToken() !== null;
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }

  login(payload: any) {
    return this.http.post(this._baseURL + "auth/login", payload)
  }

  signup(payload: any) {
    return this.http.post(this._baseURL + "auth/register", payload)
  }

}
