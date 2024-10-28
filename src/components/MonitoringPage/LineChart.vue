<template>
  <div ref="chartContainer" class="line-chart"></div> <!-- 使用ref代替id -->
</template>

<script setup>
import * as echarts from 'echarts';
import { onMounted, onUnmounted, ref } from 'vue';
import { generateTimeSeriesData } from '@/utils/Constant'; // 引用 Constant.js 中的函数

const chartContainer = ref(null); // 使用 ref 来保存 DOM 元素引用
let myChart = null; // 保存 ECharts 实例
let intervalId = null; // 用于保存 setInterval 的 ID

onMounted(() => {
  const { times, variable1,variable2, variable3} = generateTimeSeriesData(20); // 生成初始数据
  myChart = echarts.init(chartContainer.value); // 初始化 ECharts 实例

  const option = {
    grid: {
      left: '3%',
      right: '3%',
      bottom: '1%',
      containLabel: true
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'cross' }
    },
    legend: {
      right: '5%',
      textStyle: {
        color: '#fff',
        opacity: 0.7
      }
    },
    xAxis: [
      {
        type: 'category',
        axisTick: {
          alignWithLabel: true
        },
        data: times, // 时间轴数据
        axisLabel: {
          interval: 3 // 每隔3个点显示一个标记
        }
      }
    ],
    yAxis: {
      type: 'value', // 对应变量的Y轴
      name: '变量',
      min: 'dataMin', // 动态最小值
      max: 'dataMax'  // 动态最大值
    },
    series: [
      {
        name: 'X 轴',
        type: 'line',
        data: variable1, // 对应变量 X 的数据
        smooth: true
      },
      {
        name: 'Y 轴',
        type: 'line',
        data: variable2, // 对应变量 Y 的数据
        smooth: true
      },
      {
        name: 'Z 轴',
        type: 'line',
        data: variable3, // 对应变量 Z 的数据
        smooth: true
      }
    ]
  };

  // 设置初始图表配置
  myChart.setOption(option);

  // 动态更新数据的函数
  function updateChartData() {
    const { times, variable1, variable2, variable3  } = generateTimeSeriesData(20); // 每次生成新的数据

    // 更新 X 轴和 series 数据
    myChart.setOption({
      xAxis: {
        data: times
      },
      series: [
        {
          name: 'X 轴',
          data: variable1
        },
        {
          name: 'Y 轴',
          data: variable2
        },
        {
          name: 'Z 轴',
          data: variable3
        }
      ]
    });
  }

  // 每隔 2 秒更新一次数据
  intervalId = setInterval(updateChartData, 2000);

  // 监听窗口大小变化，保持图表自适应
  window.onresize = () => {
    myChart.resize();
  };
});

// 在组件卸载时清理定时器
onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId); // 清除定时器
  }
});
</script>

<style lang="scss" scoped>
.line-chart {
  height: 100%;
  width: 100%;
}
</style>
