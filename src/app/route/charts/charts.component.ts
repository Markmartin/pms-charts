import { Component, OnInit } from '@angular/core';
import dayjs from 'dayjs';
import * as echarts from 'echarts';
import { EChartsType } from 'echarts';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss'],
})
export class ChartsComponent implements OnInit {
  date = '';
  chartDom = document.getElementById('charts-sales');
  myChart: EChartsType | null = null;
  option = {
    legend: {},
    tooltip: {},
    dataset: {
      source: [
        ['product', '2015', '2016', '2017'],
        ['Matcha Latte', 43.3, 85.8, 93.7],
        ['Milk Tea', 83.1, 73.4, 55.1],
        ['Cheese Cocoa', 86.4, 65.2, 82.5],
        ['Walnut Brownie', 72.4, 53.9, 39.1],
      ],
    },
    xAxis: { type: 'category' },
    yAxis: {},
    // Declare several bar series, each will be mapped
    // to a column of dataset.source by default.
    series: [{ type: 'bar' }, { type: 'bar' }, { type: 'bar' }],
  };
  constructor() {
    this.date = dayjs().format('YYYY-MM');
  }

  ngOnInit(): void {
    this.chartDom = document.getElementById('charts-sales');
    if (this.chartDom) {
      this.myChart = echarts.init(this.chartDom);
      if (this.option) {
        this.myChart.setOption(this.option);
      }
    }
  }

  ngAfterViewInit(): void {}
}
