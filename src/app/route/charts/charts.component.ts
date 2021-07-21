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
  date = dayjs().subtract(1, 'month').format('YYYY-MM');
  // 时间跨度选项
  dateOptions = [
    { viewValue: '月度', value: '0' },
    { viewValue: '年度', value: '1' },
  ];
  // 地区选项
  areaOptions = [{ viewValue: '全国', value: '' }];
  // 销售日报
  salesTimeSpan = '0';
  salesBarChart!: EChartsType;
  salesBarChartOption = {
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
    legend: { data: ['目标', '批售', '零售'] },
    grid: {
      left: '3%',
      right: '4%',
      // top: '0%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      axisLabel: {
        interval: 0,
        rotate: -30,
      },
    },
    yAxis: { type: 'value' },
    dataset: {
      dimensions: ['partnerName', 'targetCount', 'psCount', 'lsCount'],
      source: [],
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
      dimensions: ['partnerName', 'testDriveCount'],
      source: [],
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
      right: '10%',
      top: '0%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: { type: 'value' },
    yAxis: { type: 'category', inverse: true },
    dataset: {
      dimensions: ['partnerName', 'clueCount', 'unClueCount'],
      source: [],
    },
    series: [
      { name: '已跟踪线索', type: 'bar', stack: 'total' },
      {
        name: '未跟踪线索',
        type: 'bar',
        stack: 'total',
        label: {
          show: true,
          position: 'right',
          formatter: (params: any) => {
            return `${params.value.percentage}%`;
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
      right: '10%',
      top: '0%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: { type: 'value' },
    yAxis: { type: 'category', inverse: true },
    dataset: {
      dimensions: ['partnerName', 'clueCount', 'unClueCount'],
      source: [],
    },
    series: [
      { name: '已分发线索', type: 'bar', stack: 'total' },
      {
        name: '未分发目标',
        type: 'bar',
        stack: 'total',
        label: {
          show: true,
          position: 'right',
          formatter: (params: any) => {
            return `${params.value.percentage}%`;
          },
        },
      },
    ],
  };

  form = this.formBuilder.group({
    salesTimeSpan: ['0'],
    salesArea: [''],
    driveTimeSpan: ['0'],
    clueFollowArea: [''],
  });

  debounceUpdateAllCharts = _.debounce(this.updateAllCharts, 1500);

  constructor(
    private formBuilder: FormBuilder,
    private httpService: HttpService
  ) {}

  ngOnInit(): void {
    const metaThemeColor = document.querySelector('meta[name=theme-color]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', '#4352af');
    }

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

    // 更新地区列表
    this.updateArea();
  }

  updateArea() {
    this.httpService.apiAreaSet().subscribe((resp) => {
      if (resp.status) {
        const areaOptions = resp.data.map(
          (item: { code: string; name: string }) => ({
            value: item.code,
            viewValue: item.name,
          })
        );
        this.areaOptions.push(...areaOptions);

        this.updateAllCharts();
      }
    });
  }

  //更改全局时间=>会刷新所有chart
  updateDate(value: number) {
    this.date = dayjs(this.date).add(value, 'month').format('YYYY-MM');
    this.debounceUpdateAllCharts();
  }

  // 更新全部图表
  updateAllCharts() {
    console.log('更新所有的视图');
    console.log(this.date);
    this.updateSalesChart();
    this.updateDriveChart();
    this.updateClueFollowChart();
    this.updateClueDistributionChart();
  }

  // 更新销售日报
  updateSalesChart() {
    this.httpService
      .apiSalesChart(
        this.date,
        this.form.value.salesTimeSpan,
        this.form.value.salesArea
      )
      .subscribe((resp) => {
        if (resp.status) {
          const source = resp.data.map(
            (item: {
              partnerName: string;
              targetCount: number;
              psCount: number;
              lsCount: number;
            }) => ({
              partnerName: item.partnerName,
              targetCount: item.targetCount,
              psCount: item.psCount,
              lsCount: item.lsCount,
            })
          );

          this.salesBarChartOption = {
            ...this.salesBarChartOption,
            dataset: {
              ...this.salesBarChartOption.dataset,
              source,
            },
          };
          const salesDom = document.getElementById('charts-sales');
          if (salesDom) {
            const width = 15 * source.length > 100 ? 15 * source.length : 100;
            salesDom.style.width = `${width}vw`;
          }
          this.salesBarChart.resize();
          this.salesBarChart.setOption(this.salesBarChartOption);
        }
      });
  }

  // 更新试驾排名
  updateDriveChart() {
    this.httpService
      .apiDriveChart(this.date, this.form.value.driveTimeSpan)
      .subscribe((resp) => {
        if (resp.status) {
          const source = resp.data.map(
            (item: { partnerName: string; testDriveCount: number }) => ({
              partnerName: item.partnerName,
              testDriveCount: item.testDriveCount,
            })
          );

          this.driveBarChartoption = {
            ...this.driveBarChartoption,
            dataset: {
              ...this.driveBarChartoption.dataset,
              source,
            },
          };

          const driveDom = document.getElementById('charts-drive');
          if (driveDom) {
            const height = 15 * source.length > 100 ? 15 * source.length : 100;
            driveDom.style.height = `${height}vw`;
          }
          this.driveBarChart.resize();
          this.driveBarChart.setOption(this.driveBarChartoption);
        }
      });
  }

  // 更新线索跟进
  updateClueFollowChart() {
    this.httpService
      .apiClueFollowChart(this.date, this.form.value.clueFollowArea)
      .subscribe((resp) => {
        if (resp.status) {
          const source = resp.data.map(
            (item: {
              partnerName: string;
              clueCount: number;
              unClueCount: number;
              percentage: number;
            }) => ({
              partnerName: item.partnerName,
              clueCount: item.clueCount,
              unClueCount: item.unClueCount - item.clueCount,
              percentage: item.percentage,
            })
          );

          this.clueFollowBarChartOption = {
            ...this.clueFollowBarChartOption,
            dataset: {
              ...this.clueFollowBarChartOption.dataset,
              source,
            },
          };

          const clueFollowDom = document.getElementById('charts-clue-follow');
          if (clueFollowDom) {
            const height = 10 * source.length > 100 ? 10 * source.length : 100;
            clueFollowDom.style.height = `${height}vw`;
          }
          this.clueFollowBarChart.resize();
          this.clueFollowBarChart.setOption(this.clueFollowBarChartOption);
        }
      });
  }

  // 更新线索分发
  updateClueDistributionChart() {
    this.httpService.apiClueDistributionChart(this.date).subscribe((resp) => {
      if (resp.status) {
        const source = resp.data.map(
          (item: {
            partnerName: string;
            clueCount: number;
            unClueCount: number;
            percentage: number;
          }) => ({
            partnerName: item.partnerName,
            clueCount: item.clueCount,
            unClueCount:
              item.unClueCount - item.clueCount > 0
                ? item.unClueCount - item.clueCount
                : 0,
            percentage: item.percentage,
          })
        );

        this.clueDistributionChartOption = {
          ...this.clueDistributionChartOption,
          dataset: {
            ...this.clueDistributionChartOption.dataset,
            source,
          },
        };

        const clueDistributeDom = document.getElementById(
          'charts-clue-distribution'
        );
        if (clueDistributeDom) {
          const height = 10 * source.length > 100 ? 10 * source.length : 100;
          clueDistributeDom.style.height = `${height}vw`;
        }
        this.clueDistributionBarChart.resize();
        this.clueDistributionBarChart.setOption(
          this.clueDistributionChartOption
        );
      }
    });
  }
}
