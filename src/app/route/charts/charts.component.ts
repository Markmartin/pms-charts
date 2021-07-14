import { Component, OnInit } from '@angular/core';
import dayjs from 'dayjs';
import * as echarts from 'echarts';
import { EChartsType } from 'echarts';
import { FormBuilder } from '@angular/forms';
import * as _ from 'lodash';

import { HttpService } from '@/service/request/http.service';

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
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
    legend: { data: ['目标', '批售', '零售'] },
    xAxis: { type: 'category' },
    yAxis: { type: 'value' },
    dataset: {
      dimensions: ['category', 'mb', 'ps', 'ls'],
      source: [
        { category: '上海', mb: 43.3, ps: 85.8, ls: 93.7 },
        { category: '北京', mb: 43.3, ps: 85.8, ls: 93.7 },
        { category: '江苏', mb: 43.3, ps: 85.8, ls: 93.7 },
        { category: '浙江', mb: 43.3, ps: 85.8, ls: 93.7 },
        { category: '南京', mb: 43.3, ps: 85.8, ls: 93.7 },
        { category: '嘉定', mb: 43.3, ps: 85.8, ls: 93.7 },
        { category: '黄埔', mb: 43.3, ps: 85.8, ls: 93.7 },
        { category: '杨浦', mb: 43.3, ps: 85.8, ls: 93.7 },
      ],
    },
    series: [
      { name: '目标', type: 'bar', barGap: 0 },
      { name: '批售', type: 'bar' },
      { name: '零售', type: 'bar' },
    ],
  };

  // 试驾柱状图
  driveTimeSpan = '0';
  driveBarChart!: EChartsType;
  driveBarChartoption = {
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
    legend: { show: false },
    grid: {
      left: '3%',
      right: '4%',
      top: '0%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: { type: 'value' },
    yAxis: { type: 'category', inverse: true },
    dataset: {
      dimensions: ['category', 'sj'],
      source: [
        { category: '上海吴越广场体验中心1', sj: 10 },
        { category: '上海中间广场体验中心2', sj: 10 },
        { category: '杭州湖滨银泰体验中心3', sj: 10 },
        { category: '西安曲江星悦荟体验中心4', sj: 10 },
        { category: '苏州龙湖狮山天街体验中心5', sj: 10 },
        { category: '苏州龙湖狮山天街体验中心6', sj: 10 },
        { category: '上海中间广场体验中心7', sj: 10 },
        { category: '杭州湖滨银泰体验中心8', sj: 10 },
        { category: '西安曲江星悦荟体验中心9', sj: 10 },
        { category: '苏州龙湖狮山天街体验中心10', sj: 10 },
        { category: '苏州龙湖狮山天街体验中心11', sj: 10 },
      ],
    },
    series: [{ name: '试驾数', type: 'bar' }],
  };

  // 线索跟进柱状图
  clueFolowTimeSpan = '0';
  clueFollowBarChart!: EChartsType;
  clueFollowBarChartOption = {
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
    grid: {
      left: '3%',
      right: '4%',
      top: '0%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: { type: 'value' },
    yAxis: { type: 'category', inverse: true },
    dataset: {
      dimensions: ['category', 'clueFollow', 'clueUnFollow'],
      source: [
        { category: '上海吴越广场体验中心1', clueFollow: 10, clueUnFollow: 5 },
        { category: '上海中间广场体验中心2', clueFollow: 10, clueUnFollow: 5 },
        { category: '杭州湖滨银泰体验中心3', clueFollow: 10, clueUnFollow: 5 },
        {
          category: '西安曲江星悦荟体验中心4',
          clueFollow: 10,
          clueUnFollow: 5,
        },
        {
          category: '苏州龙湖狮山天街体验中心5',
          clueFollow: 10,
          clueUnFollow: 5,
        },
        {
          category: '苏州龙湖狮山天街体验中心6',
          clueFollow: 10,
          clueUnFollow: 5,
        },
        { category: '上海中间广场体验中心7', clueFollow: 10, clueUnFollow: 5 },
        { category: '杭州湖滨银泰体验中心8', clueFollow: 10, clueUnFollow: 5 },
        {
          category: '西安曲江星悦荟体验中心9',
          clueFollow: 10,
          clueUnFollow: 5,
        },
        {
          category: '苏州龙湖狮山天街体验中心10',
          clueFollow: 10,
          clueUnFollow: 5,
        },
        {
          category: '苏州龙湖狮山天街体验中心11',
          clueFollow: 10,
          clueUnFollow: 5,
        },
      ],
    },
    series: [
      { name: '已跟踪', type: 'bar', stack: 'total' },
      {
        name: '未跟踪',
        type: 'bar',
        stack: 'total',
        label: {
          show: true,
          position: 'right',
          formatter: (params: any) => {
            return `${(
              params.value.clueUnFollow /
              (params.value.clueFollow + params.value.clueUnFollow)
            ).toFixed(1)}%`;
          },
        },
      },
    ],
  };

  // 线索分发
  clueDistributionBarChart!: EChartsType;
  clueDistributionChartOption = {
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
    grid: {
      left: '3%',
      right: '4%',
      top: '0%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: { type: 'value' },
    yAxis: { type: 'category', inverse: true },
    dataset: {
      dimensions: ['category', 'clueFollow', 'clueUnFollow'],
      source: [
        { category: '上海吴越广场体验中心1', clueFollow: 10, clueUnFollow: 5 },
        { category: '上海中间广场体验中心2', clueFollow: 10, clueUnFollow: 5 },
        { category: '杭州湖滨银泰体验中心3', clueFollow: 10, clueUnFollow: 5 },
        {
          category: '西安曲江星悦荟体验中心4',
          clueFollow: 10,
          clueUnFollow: 5,
        },
        {
          category: '苏州龙湖狮山天街体验中心5',
          clueFollow: 10,
          clueUnFollow: 5,
        },
        {
          category: '苏州龙湖狮山天街体验中心6',
          clueFollow: 10,
          clueUnFollow: 5,
        },
        { category: '上海中间广场体验中心7', clueFollow: 10, clueUnFollow: 5 },
        { category: '杭州湖滨银泰体验中心8', clueFollow: 10, clueUnFollow: 5 },
        {
          category: '西安曲江星悦荟体验中心9',
          clueFollow: 10,
          clueUnFollow: 5,
        },
        {
          category: '苏州龙湖狮山天街体验中心10',
          clueFollow: 10,
          clueUnFollow: 5,
        },
        {
          category: '苏州龙湖狮山天街体验中心11',
          clueFollow: 10,
          clueUnFollow: 5,
        },
      ],
    },
    series: [
      { name: '已跟踪', type: 'bar', stack: 'total' },
      {
        name: '未跟踪',
        type: 'bar',
        stack: 'total',
        label: {
          show: true,
          position: 'right',
          formatter: (params: any) => {
            return `${(
              params.value.clueUnFollow /
              (params.value.clueFollow + params.value.clueUnFollow)
            ).toFixed(1)}%`;
          },
        },
      },
    ],
  };

  form = this.formBuilder.group({
    salesTimeSpan: ['0'],
    salesArea: ['0'],
    driveTimeSpan: ['0'],
    clueFollowArea: ['0'],
  });

  debounceUpdateAllCharts = _.debounce(this.updateAllCharts, 1500);

  constructor(
    private formBuilder: FormBuilder,
    private httpService: HttpService
  ) {}

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

    const clueFollowDom = document.getElementById('charts-clue-follow');
    if (clueFollowDom) {
      this.clueFollowBarChart = echarts.init(clueFollowDom);
      this.clueFollowBarChart.setOption(this.clueFollowBarChartOption);
    }

    const clueDistributeDom = document.getElementById(
      'charts-clue-distribution'
    );
    if (clueDistributeDom) {
      this.clueDistributionBarChart = echarts.init(clueDistributeDom);
      this.clueDistributionBarChart.setOption(this.clueDistributionChartOption);
    }
  }

  updateArea() {
    this.httpService.apiAreaSet().subscribe((resp) => {
      console.log(resp);
    });
  }

  //更改全局时间=>会刷新所有chart
  updateDate(value: number) {
    this.date = dayjs(this.date).add(value, 'month').format('YYYY-MM');
    this.debounceUpdateAllCharts();
  }

  updateAllCharts() {
    console.log('更新所有的视图');
    console.log(this.date);
  }
}
