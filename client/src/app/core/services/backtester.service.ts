import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StrategyMetadata, Strategy } from 'src/app/shared/models/backtester';
import { Branches, Countries, Markets, Sectors } from 'src/app/shared/models/borsdata';
import { User } from 'src/app/shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class BacktesterService {
  /**
   * Backtester Service providing method for starting a backtest by doing
   * a post request to the express server, which in turn makes a request
   * to the python backtester.
   */

  private baseUrl = 'http://localhost:8080/api/backtester';

  constructor(private http: HttpClient) { }

  runBacktest(strategyMetadata: StrategyMetadata): Observable<Strategy> {
    return this.http.post<Strategy>(this.baseUrl + '/run', strategyMetadata);
  }


}
