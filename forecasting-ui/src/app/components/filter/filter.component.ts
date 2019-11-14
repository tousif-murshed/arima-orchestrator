import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

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
  channel: any;

  constructor(private datePipe: DatePipe) { }

  ngOnInit() {
    this.minDate = new Date();
    this.historyStartDate = new Date();
    this.forecastStartDate = new Date();
    this.historyWeek = '4';
    this.forecastWeek = '4';
    this.channel = '111';
    this.applyChange();
  }

  applyChange() {
    this.filterChange.emit({
      'historydate': this.historyStartDate,
      'historyweek': this.historyWeek,
      'forecastdate': this.forecastStartDate,
      'forecastweek': this.forecastWeek,
      'channel': this.channel
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
