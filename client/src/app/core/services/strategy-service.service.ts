import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Strategy } from 'src/app/shared/models/backtester';

@Injectable({
  providedIn: 'root'
})
export class StrategyService {
  /**
   * Strategy Service proving methods for doing all strategy-related
   * requests to the express server for fetching strategies.
   */

  private baseUrl = 'http://localhost:8080/api/strategies';

  constructor(private http: HttpClient) { }

  getAllStrategies(): Observable<Strategy[]> {
    return this.http.get<Strategy[]>(this.baseUrl + '/all');
  }

  getStrategiesFeed(): Observable<Strategy[]> {
    return this.http.get<Strategy[]>(`${this.baseUrl}/feed`)
  }

  getStrategiesExplore(): Observable<Strategy[]> {
    return this.http.get<Strategy[]>(`${this.baseUrl}/explore`)
  }

  getMyStrategies(): Observable<Strategy[]> {
    return this.http.get<Strategy[]>(this.baseUrl + '/my')
  }

  getUserStrategies(username: string): Observable<Strategy[]> {
    return this.http.get<Strategy[]>(`http://localhost:8080/api/users/${username}/strategies`)
  }

  getStrategy(username: string, strategyName: string): Observable<Strategy> {
    return this.http.get<Strategy>(`http://localhost:8080/api/users/${username}/strategies/${strategyName}`)
  }

}
