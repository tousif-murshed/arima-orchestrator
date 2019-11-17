import { Component, OnChanges, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ReportService } from 'src/app/services/report.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import * as c3 from 'c3';
import * as d3 from 'd3';
import { ChartColor } from 'src/environments/environment';

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
  productList: any[];
  isRespond = false;
  errorMsg = '';

  modalRef: BsModalRef;
  chartData: any;

  constructor(private datePipe: DatePipe,
    private service: ReportService,
    private modalService: BsModalService) { }

  ngOnChanges() {
    this.historyStartDate = this.datePipe.transform(this.filterData.historydate, 'MM-dd-yyyy');
    this.forecastStartDate = this.datePipe.transform(this.filterData.forecastdate, 'MM-dd-yyyy');
    this.getProductAttributes();
  }

  getProductAttributes() {
    this.filterData.historydate = this.historyStartDate;
    this.filterData.forecastdate = this.forecastStartDate;
    this.isRespond = false;
    this.errorMsg = '';
    this.service.getProductAttributes(this.filterData).subscribe(data => {
      this.isRespond = true;
      this.productList = data;
    }, error => {
      this.isRespond = true;
      this.errorMsg = 'Problem due to some technical issue. Please try again later.';
      console.log('Error occured ' + error);
    });
  }


  openChartsModal(templateDetails: TemplateRef<any>, product: any) {
    // this.drawSalesTrends(null);
    this.chartData = product;
    this.modalRef = this.modalService.show(templateDetails, Object.assign({}, { class: 'modal-lg' }));
  }
}
