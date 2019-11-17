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
  maxDate: Date;
  historyStartDate: Date;
  historyWeek: any;
  forecastStartDate: Date;
  forecastWeek: any;
  channel: any;

  constructor(private datePipe: DatePipe) { }

  ngOnInit() {
    this.minDate = this.addDays(new Date(), -7);
    this.maxDate = new Date();
    this.historyStartDate = this.getMinDate();
    this.forecastStartDate = new Date();
    this.historyWeek = '4';
    this.forecastWeek = '4';
    this.channel = '111';
    this.applyChange();
    // this.getMinDate();
  }

  applyChange() {

    if (this.forecastWeek > this.historyWeek) {
      alert('Number of forcast weeks should not be greater than number of history weeks.');
      return false;
    }

    this.filterChange.emit({
      'historydate': this.historyStartDate,
      'historyweek': this.historyWeek,
      'forecastdate': this.forecastStartDate,
      'forecastweek': this.forecastWeek,
      'channel': this.channel
    });
  }
  // reset() {
  //   const historyDate = new Date();
  //   const forcastDate = new Date();
  //   this.filterChange.emit({
  //     'historydate': historyDate,
  //     'historyweek': 4,
  //     'forecastdate': forcastDate,
  //     'forecastweek': 4,
  //     'channel': 111
  //   });
  // }

  getMinDate() {
    return this.addDays(new Date(), -30);
  }

  addDays(date: Date, days: number): Date {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + days);
    return newDate;
  }
}
