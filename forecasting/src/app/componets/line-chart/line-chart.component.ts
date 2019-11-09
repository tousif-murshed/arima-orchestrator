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
    // if (changes.data) {
      this.drawChart(changes.data.currentValue);
    // }
  }

  drawChart(chartData: any) {
    if (!this.chart) {
      setTimeout(() => {
        this.chart = c3.generate({
          bindto: '#' + this.divId,
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
                // if (value > 100000) {
                //   return d3.format('$,.1f')(value / 1000000) + 'Mn';
                // } else if (value > 100) {
                //   return d3.format('$,.1f')(value / 1000) + 'K';
                // } else {
                //   return d3.format('$,.1f')(value);
                // }
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
              categories: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
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
