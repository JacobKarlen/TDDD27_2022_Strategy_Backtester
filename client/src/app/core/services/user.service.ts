import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl + '/users');
  }

  followUser(username: string): Observable<Object> {
    return this.http.put(`${this.baseUrl}/users/follow/${username}`, {})
  }

  unfollowUser(username: string): Observable<Object> {
    return this.http.put(`${this.baseUrl}/users/unfollow/${username}`, {})
  }

  getFollowing(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/following`)
  }

}
