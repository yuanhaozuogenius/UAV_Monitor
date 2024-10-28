<template>
  <div ref="curveChart" id="curvechart"></div>
</template>

<script setup>
import echarts from '@/Echarts/echarts'
import { ref, onMounted } from 'vue'
import { sysGetHealthService } from '@/api/system'
const curveChart = ref(null)
const option = {
  grid: {
    top: '20%',
    left: '3%',
    right: '3%',
    bottom: '0%',
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
  xAxis: {
    data: [],
    axisLabel: {
      interval: 0
    }
  },
  yAxis: {
    type: 'value',
    name: '健康度',
    min: 0,
    max: 1
  },
  series: [
    {
      name: '健康度',
      data: [],
      type: 'line',
      smooth: true
    }
  ]
}
onMounted(async () => {
  const myCurveChart = echarts.init(curveChart.value)
  myCurveChart.setOption(option)
  myCurveChart.showLoading({
    text: '加载中...',
    textColor: 'rgba(255,255,255,0.8)',
    color: '#fff',
    fontSize: 16,
    maskColor: '#06164a'
  })
  const res = await sysGetHealthService()
  // console.log(res.data.data)
  const healthDegree = res.data.data[0].healthDegree
  const times = res.data.data[0].times
  // console.log(healthDegree, times)
  // console.log("times:", times)
  myCurveChart.hideLoading()
  myCurveChart.setOption({
    xAxis: {
      data: times
    },
    series: [
      {
        data: healthDegree
      }
    ]
  })
})
</script>

<style lang="scss" scoped>
#curvechart {
  height: 100%;
  width: 100%;
}
</style>
