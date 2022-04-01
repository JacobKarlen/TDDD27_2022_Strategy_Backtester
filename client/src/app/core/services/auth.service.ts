import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';

import { User } from 'src/app/shared/models/user';

interface LoginInformation {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  login(loginInfo: LoginInformation): Observable<User> {
    return this.http.post<User>(this.baseUrl + '/login', loginInfo);
  }

}
