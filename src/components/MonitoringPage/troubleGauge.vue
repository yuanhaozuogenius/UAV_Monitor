<template>
  <div ref="troubleGauge" id="gaugechart"></div>
</template>
<script setup>
import echarts from '@/Echarts/echarts'
import { GaugeChart } from 'echarts/charts'
echarts.use([GaugeChart])
import { ref, onMounted } from 'vue'
import { sysGetFaultProbabilityService } from '@/api/system'
const troubleGauge = ref(null)
const option = {
  tooltip: {
    formatter: '{a} <br/>{b} : {c}'
  },
  grid: {
    top: '2%',
    left: '5%',
    right: '5%',
    bottom: '0%',
    containLabel: true
  },

  legend: {
    right: '5%',
    textStyle: {
      color: '#fff',
      opacity: 0.7
    }
  },

  series: [
    {
      name: '故障概率',
      type: 'gauge',
      min: 0,
      max: 1,
      splitNumber: 10, // 分割段数，默认为5
      radius: '100%',
      center: ['50%', '60%'], // 仪表位置
      axisLine: {
        // 坐标轴线
        lineStyle: {
          // 属性lineStyle控制线条样式
          color: [
            [0.2, '#228b22'],
            [0.8, '#48b'],
            [1, '#ff4500']
          ],
          width: 3, //仪表盘外围圆宽度
          shadowColor: '#fff', //默认透明
          shadowBlur: 10
        }
      },
      axisTick: {
        // 坐标轴小标记
        splitNumber: 5, // 每份split细分多少段
        length: 6, // 属性length控制线长
        lineStyle: {
          // 属性lineStyle控制线条样式
          color: 'auto'
        }
      },
      axisLabel: {
        // 坐标轴文本标签，详见axis.axisLabel
        show: false
      },
      splitLine: {
        // 分隔线
        show: true, // 默认显示，属性show控制显示与否
        length: 2, // 属性length控制线长
        lineStyle: {
          // 属性lineStyle（详见lineStyle）控制线条样式
          width: 2,
          color: '#fff',
          shadowColor: '#fff', //默认透明
          shadowBlur: 10
        }
      },
      pointer: {
        width: 2
      },
      title: {
        show: true,
        offsetCenter: [0, '100%'], // x, y，单位px
        fontWeight: 'bolder',
        fontSize: 10,
        color: '#fff'
        // textStyle: {
        //   // 其余属性默认使用全局文本样式，详见TEXTSTYLE

        // }
      },
      detail: {
        formatter: '{value}',
        offsetCenter: [0, '30%'], // x, y，单位px
        fontWeight: 'bolder',
        fontSize: 14,
        color: '#fff'
        // textStyle: {
        //   // 其余属性默认使用全局文本样式，详见TEXTSTYLE

        // }
      },
      data: ''
    }
  ]
}

onMounted(async () => {
  const myGaugeChart = echarts.init(troubleGauge.value)
  myGaugeChart.setOption(option)
  myGaugeChart.showLoading({
    text: '加载中...',
    textColor: 'rgba(255,255,255,0.8)',
    color: '#fff',
    fontSize: 16,
    maskColor: '#06164a'
  })
  const res = await sysGetFaultProbabilityService()
  myGaugeChart.hideLoading()
  myGaugeChart.setOption({
    series: [
      {
        data: [{ value: res.data.data }]
      }
    ]
  })
  window.onresize = () => {
    myGaugeChart.resize()
  }
})
</script>

<style lang="scss" scoped>
#gaugechart {
  height: 100%;
  width: 100%;
}
</style>
