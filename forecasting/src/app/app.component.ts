import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'forecasting';

  filterData: any;
  constructor() { }

  ngOnInit() {
  }

  applyChange(data: any) {
    this.filterData = data;
    console.log('app', data);
  }
}
