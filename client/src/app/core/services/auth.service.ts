import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';

import { User } from 'src/app/shared/models/user';

export interface LoginInformation {
  username: string;
  password: string;
}

export interface RegisterInformation {
  username: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  register(registerInfo: RegisterInformation): Observable<User> {
    return this.http.post<User>(this.baseUrl + '/register', registerInfo)
  }

  login(loginInfo: LoginInformation): Observable<User> {
    return this.http.post<User>(this.baseUrl + '/login', loginInfo);
  }

  logout(): Observable<string> {
    return this.http.delete<string>(this.baseUrl + '/logout');
  }

  setUserInfo(user: User): void {
    localStorage.setItem('userInfo', JSON.stringify(user))
  }

  removeUserInfo(): void {
    localStorage.removeItem('userInfo')
  }

  isAuthenticated(): boolean {
    let userInfo = localStorage.getItem('userInfo')
    return (userInfo && JSON.parse(userInfo))
  }


}
