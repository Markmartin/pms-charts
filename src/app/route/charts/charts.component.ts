import { Component, OnInit } from '@angular/core';
import dayjs from 'dayjs';
import * as echarts from 'echarts';
import { EChartsType } from 'echarts';

import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss'],
})
export class ChartsComponent implements OnInit {
  // 当前选择时间
  date = dayjs().format('YYYY-MM');
  // 销售柱状图
  dateOptions = [
    { viewValue: '年度', value: '0' },
    { viewValue: '月度', value: '1' },
  ];
  areaOptions = [
    { viewValue: '上海区', value: '0' },
    { viewValue: '全国', value: '1' },
  ];
  salesTimeSpan = '0';
  salesBarChart!: EChartsType;
  salesBarChartOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    legend: {
      data: ['目标', '批售', '零售'],
    },
    xAxis: {
      type: 'category',
      data: ['上海', '北京', '江苏', '浙江', '南京', '嘉定', '黄埔', '杨浦'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name: '目标',
        type: 'bar',
        barGap: 0,
        data: [320, 332, 301, 334, 390, 220, 182, 191],
      },
      {
        name: '批售',
        type: 'bar',
        data: [220, 182, 191, 234, 290, 201, 154, 190],
      },
      {
        name: '零售',
        type: 'bar',
        data: [150, 232, 201, 154, 190, 191, 234, 290],
      },
    ],
  };

  // 试驾柱状图
  driveTimeSpan = '0';
  driveBarChart!: EChartsType;
  driveBarChartoption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    // legend: {
    //   data: ['2011年', '2012年'],
    // },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: {
      type: 'value',
      boundaryGap: [0, 0.01],
    },
    yAxis: {
      type: 'category',
      data: [
        '上海吴越广场体验中心',
        '上海中间广场体验中心',
        '杭州湖滨银泰体验中心',
        '西安曲江星悦荟体验中心',
        '苏州龙湖狮山天街体验中心',
        '苏州龙湖狮山天街体验中心',
        '上海中间广场体验中心',
        '杭州湖滨银泰体验中心',
        '西安曲江星悦荟体验中心',
        '苏州龙湖狮山天街体验中心',
        '苏州龙湖狮山天街体验中心',
      ],
    },
    series: [
      {
        name: '试驾数',
        type: 'bar',
        data: [90, 70, 60, 50, 40, 30, 70, 60, 50, 40, 30],
      },
    ],
  };

  form = this.formBuilder.group({
    salesTimeSpan: ['0'],
    salesArea: ['0'],
    driveTimeSpan: ['0'],
  });

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    const salesDom = document.getElementById('charts-sales');
    if (salesDom) {
      this.salesBarChart = echarts.init(salesDom);
      this.salesBarChart.setOption(this.salesBarChartOption);
    }

    const driveDom = document.getElementById('charts-drive');
    if (driveDom) {
      this.driveBarChart = echarts.init(driveDom);
      this.driveBarChart.setOption(this.driveBarChartoption);
    }
  }

  ngAfterViewInit(): void {}

  updateSalesTimeSpan(value: any) {
    console.log(value);
  }
}
