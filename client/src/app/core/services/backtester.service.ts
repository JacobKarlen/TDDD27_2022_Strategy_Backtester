import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StrategyMetadata } from 'src/app/shared/models/backtester';
import { Branches, Countries, Markets, Sectors } from 'src/app/shared/models/borsdata';
import { User } from 'src/app/shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class BacktesterService {

  private baseUrl = 'http://localhost:8080/api/backtester';

  constructor(private http: HttpClient) { }

  runBacktest(strategyMetadata: StrategyMetadata): Observable<any> {
    return this.http.post<StrategyMetadata>(this.baseUrl + '/run', strategyMetadata);
  }


}
