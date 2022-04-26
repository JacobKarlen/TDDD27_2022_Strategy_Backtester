import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Strategy } from 'src/app/shared/models/backtester';

@Injectable({
  providedIn: 'root'
})
export class StrategyService {

  private baseUrl = 'http://localhost:8080/api/strategies';

  constructor(private http: HttpClient) { }

  getAllStrategies(): Observable<Strategy[]> {
    return this.http.get<Strategy[]>(this.baseUrl + '/all');
  }

  getMyStrategies(): Observable<Strategy[]> {
    return this.http.get<Strategy[]>(this.baseUrl + '/my')
  }


}
