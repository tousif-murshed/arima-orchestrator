import { Component, OnChanges, EventEmitter, Input, Output } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ReportService } from 'src/app/services/report.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnChanges {


  @Input() filterData: any;
  // @Output() readonly hiddenListChange = new EventEmitter<any>();

  historyStartDate: string;
  forecastStartDate: string;
  prouctList: any[];
  forecastWeeks: any[];
  historyWeeks: any[];

  constructor(private datePipe: DatePipe,
    private service: ReportService) { }

  ngOnChanges() {
    console.log('report-filterData', this.filterData);


    this.historyStartDate = this.datePipe.transform(this.filterData.historyStartDate, 'dd-MM-yyyy');
    this.forecastStartDate = this.datePipe.transform(this.filterData.forecastStartDate, 'dd-MM-yyyy');
    this.getProductAttributes();
    this.historyWeeks = Array(Number(this.filterData.historyWeek)).fill(0).map((x, i) => i);
    this.forecastWeeks = Array(Number(this.filterData.forecastWeek)).fill(0).map((x, i) => i);
    console.log(this.historyWeeks);
    console.log(this.forecastWeeks);
  }

  getProductAttributes() {
    this.service.getProductAttributes().subscribe(data => {
      this.prouctList = data;
    }, error => {
      console.log('Error occured ' + error);
    });
  }


}
