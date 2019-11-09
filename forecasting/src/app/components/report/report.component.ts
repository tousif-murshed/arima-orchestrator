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


  openChartsModal(templateDetails: TemplateRef<any>) {
    // this.drawSalesTrends(null);
    this.modalRef = this.modalService.show(templateDetails, Object.assign({}, { class: 'modal-lg' }));

  }

  closeModal() {

  }


  drawSalesTrends(chartData: any) {
    // console.log('Function called');
    c3.generate({
      bindto: '#salesTrends',
      data: {
        columns: [
          ['History', 1100, 800, 1000, 1400],
          ['Forecast', 1500, 900, 1200, 1600]
        ],
        type: 'line'
      },
      tooltip: {
        format: {
          value: function (value, ratio, id) {
            if (value > 100000) {
              return d3.format('$,.1f')(value / 1000000) + 'Mn';
            } else if (value > 100) {
              return d3.format('$,.1f')(value / 1000) + 'K';
            } else {
              return d3.format('$,.1f')(value);
            }
          }
        }
      },
      color: {
        pattern: [ChartColor.chart_color_1, ChartColor.chart_color_2]
      },
      axis: {
        x: {
          type: 'category',
          categories: ['History', 'Forecast'],
          tick: {
            rotate: 70,
            multiline: false
          }
        },
        y: {
          tick: {
            format: function (d) {
              return d3.format(',')(d / 1000) + 'K';
            }
          }
        }
      }
    });
  }
}
