import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  apiUrl = 'http://localhost:3500/api/';
  // apiUrl = 'assets/';
  constructor(private http: HttpClient) { }

  // This methos will connect to api/mongo of server.js
  // getProductAttributes(data: any): Observable<any> {
  //   return this.http.get(this.apiUrl + 'data.json');
  // }

  // To-Do : Mock JSON created for getting response.
  getProductAttributes(filterData: any): Observable<any> {
    return this.http.post(this.apiUrl + 'Forecast', filterData);
  }
}
