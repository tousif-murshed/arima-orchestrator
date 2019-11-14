import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as uuid from 'uuid';
import * as c3 from 'c3';
import * as d3 from 'd3';
import { ChartColor } from 'src/environments/environment';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnChanges {

  divId = `id-${uuid()}`;
  chart;
  @Input() data;
  @Input() colors = [
    ChartColor.chart_color_1,
    ChartColor.chart_color_2
  ];
  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    this.drawChart(changes.data.currentValue);
  }

  drawChart(chartData: any) {
    const history = [];
    const forecast = [];
    const historyWeeks = [];
    const forecastWeeks = [];

    let historyCnt = 1;
    chartData.history.forEach(data => {
      history.push(data.unitSold);
      historyWeeks.push('Week ' + historyCnt++);
    });

    let forecastCnt = 1;
    chartData.forecast.forEach(data => {
      forecast.push(data.unitSold);
      forecastWeeks.push('Week ' + forecastCnt++);
    });

    let categories = historyWeeks;

    if (forecastWeeks.length > historyWeeks.length) {
      categories = forecastWeeks;
    }

    if (!this.chart) {
      setTimeout(() => {
        this.chart = c3.generate({
          bindto: '#' + this.divId,
          data: {
            columns: [
              ['History', ...history],
              ['Forecast', ...forecast]
            ],
            type: 'line'
          },
          tooltip: {
            format: {
              value: function (value, ratio, id) {
                return d3.format(',')(value);
              }
            }
          },
          color: {
            pattern: this.colors
          },
          axis: {
            x: {
              type: 'category',
              categories: categories,
              tick: {
                rotate: 70,
                multiline: false
              }
            },
            y: {
              tick: {
                format: function (d) {
                  return d3.format(',')(d);
                  // return d3.format(',')(d / 1000) + 'K';
                }
              }
            }
          }
        });
      });
    } else {
      this.chart.load({
        columns: [
          ['History', 1100, 800, 1000, 1400],
          ['Forecast', 1500, 900, 1200, 1600]
        ]
      });
    }
  }
}
