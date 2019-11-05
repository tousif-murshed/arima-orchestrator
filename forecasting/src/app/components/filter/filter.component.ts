import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  @Output() readonly filterChange = new EventEmitter<any>();

  minDate: Date;
  historyStartDate: Date;
  historyWeek: any;
  forecastStartDate: Date;
  forecastWeek: any;

  constructor() { }

  ngOnInit() {
    this.minDate = new Date();
    this.historyStartDate = new Date();
    this.forecastStartDate = new Date();
    this.historyWeek = '1';
    this.forecastWeek = '1';
  }

  applyChange() {
    this.filterChange.emit({
      'historyStartDate': this.historyStartDate,
      'historyWeek': this.historyWeek,
      'forecastStartDate': this.forecastStartDate,
      'forecastWeek': this.forecastWeek
    });
  }

  // getMinDate() {
  //   return this.addDays(new Date(), 0);
  // }

  // addDays(date: Date, days: number): Date {
  //   const newDate = new Date(date);
  //   newDate.setDate(newDate.getDate() + days);
  //   return newDate;
  // }
}
