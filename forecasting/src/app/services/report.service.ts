import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  // apiUrl = 'api/';
  apiUrl = 'assets/';
  constructor(private http: HttpClient) { }

  // This methos will connect to api/mongo of server.js
  // getProductAttributes(): Observable<any> {
  //   return this.http.get(this.apiUrl + 'mongo');
  // }

  // To-Do : Mock JSON created for getting response.
  getProductAttributes(): Observable<any> {
    return this.http.get(this.apiUrl + 'data.json');
  }
}
