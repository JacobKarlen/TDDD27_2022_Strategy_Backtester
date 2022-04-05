import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class BorsdataService {

  private baseUrl = 'http://localhost:8080/api/borsdata';

  constructor(private http: HttpClient) { }

  getMarkets(): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/markets');
  }

  getCountries(): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/countries');
  }

  getSectors(): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/sectors');
  }

  getBranches(): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/branches');
  }



}
