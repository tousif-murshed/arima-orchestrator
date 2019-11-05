import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReportService {



  apiUrl = 'https://jsonplaceholder.typicode.com/';
  constructor(private http: HttpClient) { }

  getProductAttributes(): Observable<any> {
    return this.http.get(this.apiUrl + 'posts');
  }



}
