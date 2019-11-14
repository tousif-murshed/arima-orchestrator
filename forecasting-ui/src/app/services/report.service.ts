import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  // apiUrl = 'https://live-19f777ef8d8c34e449b59022b87dc5b6e652996165430b9bf3adcbd.turing.doselect.com/api/';
  apiUrl = 'assets/';
  constructor(private http: HttpClient) { }

  // This methos will connect to api/mongo of server.js
  getProductAttributes(data: any): Observable<any> {
    return this.http.get(this.apiUrl + 'data.json');
  }

  // To-Do : Mock JSON created for getting response.
  // getProductAttributes(filterData: any): Observable<any> {
  //   // return this.http.post(this.apiUrl + 'Forecast', filterData);
  // }
}
