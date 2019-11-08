import { Component, OnChanges, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ReportService } from 'src/app/services/report.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

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
  forecastWeeks: any[];
  historyWeeks: any[];

  modalRef: BsModalRef;

  constructor(private datePipe: DatePipe,
    private service: ReportService,
    private modalService: BsModalService) { }

  ngOnChanges() {
    this.historyStartDate = this.datePipe.transform(this.filterData.historyStartDate, 'dd-MM-yyyy');
    this.forecastStartDate = this.datePipe.transform(this.filterData.forecastStartDate, 'dd-MM-yyyy');
    this.getProductAttributes();
    this.historyWeeks = Array(Number(this.filterData.historyWeek)).fill(0).map((x, i) => i);
    this.forecastWeeks = Array(Number(this.filterData.forecastWeek)).fill(0).map((x, i) => i);
  }

  getProductAttributes() {
    this.service.getProductAttributes().subscribe(data => {
      this.productList = data;
    }, error => {
      console.log('Error occured ' + error);
    });
  }


  openChartsModal(templateDetails) {
    console.log(templateDetails);
    const template: TemplateRef<any> = templateDetails.modalRef;
    // this.chartHeader = templateDetails.chartTitle;

    // this.dashboardSvc.getCommentsForChart(templateDetails.metricId).subscribe(commentDetails => {
    //   console.log('commentsList', commentDetails);
    //   this.commentsList = commentDetails.comments;
    //   this.commentMetricId = commentDetails.metricsId;
    // }, err => {
    //   console.log('unable to load comments');
    // });

    this.modalRef = this.modalService.show(template, Object.assign({}, { class: 'modal-lg' }));
  }

  closeModal() {

  }
}
