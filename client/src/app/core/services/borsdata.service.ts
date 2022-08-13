import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Branches, Countries, Markets, Sectors } from 'src/app/shared/models/borsdata';
import { User } from 'src/app/shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class BorsdataService {
  /**
   * Borsdata Service, providing methods for getting markets, countries
   * sectors and branches from the express service for the backtester interface.
   * 
   * Instead of directly requesting the 3rd party Borsdata API, we make all requests
   * through the express backend which implements an API wrapper. This way the API key
   * is in safe hands...
   */

  private baseUrl = 'http://localhost:8080/api/borsdata';

  constructor(private http: HttpClient) { }

  getMarkets(): Observable<Markets> {
    return this.http.get<Markets>(this.baseUrl + '/markets');
  }

  getCountries(): Observable<Countries> {
    return this.http.get<Countries>(this.baseUrl + '/countries');
  }

  getSectors(): Observable<Sectors> {
    return this.http.get<Sectors>(this.baseUrl + '/sectors');
  }

  getBranches(): Observable<Branches> {
    return this.http.get<Branches>(this.baseUrl + '/branches');
  }



}
