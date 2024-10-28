<template>
  <div ref="processPie" class="echarts"></div>
</template>

<script setup>
import echarts from '@/Echarts/echarts'
import { onMounted, ref } from 'vue'
// const radius = [0, '45%']
// const radius1 = ['47%', '55%']
// const radius2 = ['59%', '61%']
// const radius3 = ['61.5%', '63.5%']
// const radius4 = ['64%', '67%']
const processPie = ref(null)

const option = {
  title: {
    text: '训练进度',
    left: 'center',
    top: '5%',
    textStyle: {
      color: 'yellow',
      fontSize: 25,
      fontWeight: '600'
    },
    subtext: {
      text: '100%',
      left: 'center',
      top: '35%',
      textStyle: {
        color: '#fdf914',
        fontSize: '30',
        fontFamily: 'Lato',
        fontWeight: '100'
      }
    }
  },
  polar: {
    radius: ['47%', '55%'],
    angle: [0, 360],
    center: ['50%', '50%']
  },
  tooltip: {
    trigger: 'item',
    triggerOn: 'mousemove',
    formatter: '{a} <br/>{b}: {c} ({d}%)'
  },
  legend: {
    orient: 'vertical',
    left: 'left',
    data: ['训练进度']
  },
  series: [
    {
      name: '训练进度',
      type: 'pie',
      radius: ['50%', '60%'],
      center: ['50%', '50%'],
      data: [{ value: 100, itemStyle: { color: '#136AED' } }],
      emphasis: {
        itemStyle: {
          color: '#136AED'
        }
      }
    }
  ]
}
onMounted(() => {
  // console.log(processPie.value)
  const myChart = echarts.init(processPie.value)
  myChart.setOption(option)
})
</script>

<style scoped>
.echarts {
  width: 100%;
  height: 100%;
  margin: auto;
}
</style>
<!-- <template>
  <div ref="processPie" class="echarts"></div>
</template>

<script>
var radius = [0, '45%']
var radius1 = ['47%', '55%']
var radius2 = ['59%', '61%']
var radius3 = ['61.5%', '63.5%']
var radius4 = ['64%', '67%']
export default {
  name: 'processPie',
  data() {
    return {
      myEcharts: null
    }
  },
  components: {},
  mounted() {
    this.initEcharts()
  },
  props: {
    data: {
      //   type: Array,
      default: () => 0
    }
  },
  watch: {
    data(newValue, preValue) {
      // let temp = Math.abs(newValue[0]) * 10 + 20
      this.$nextTick(() => {
        console.log('检测到数据刷新')
        this.paint()
      })
    }
  },
  methods: {
    initEcharts() {
      //   let value = 10;
      this.myEcharts = this.$echarts.init(this.$refs.processPie)
      let option = {
        // backgroundColor: "#000",
        title: [
          {
            text: this.data + '%',
            x: 'center',
            top: '52%',
            textStyle: {
              color: 'yellow',
              fontSize: 25,
              fontWeight: '600'
            },
            z: 100
          },
          {
            text: '训练进度',
            x: 'center',
            top: '42%',
            textStyle: {
              fontSize: '30',
              color: '#fdf914',
              fontFamily: 'Lato',
              foontWeight: '100'
            },
            z: 100
          }
        ],
        polar: {
          radius: radius1,
          center: ['50%', '50%']
        },
        angleAxis: {
          max: 100,
          show: false
        },
        radiusAxis: {
          type: 'category',
          show: true,
          axisLabel: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          }
        },
        series: [
          {
            name: '',
            type: 'bar',
            roundCap: true,
            barWidth: 60,
            showBackground: true,
            backgroundStyle: {
              color: 'rgba(0, 0, 0,1)'
            },
            data: [this.data],
            coordinateSystem: 'polar',

            itemStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 1, 0, 0, [
                  {
                    offset: 0,
                    color: '#00FFC0'
                  },
                  {
                    offset: 1,
                    color: '#136AED'
                  }
                ])
              }
            }
          },
          {
            name: '',
            type: 'pie',
            startAngle: 90,
            radius: radius2,
            hoverAnimation: false,
            center: ['50%', '50%'],
            itemStyle: {
              normal: {
                labelLine: {
                  show: false
                },
                color: 'rgba(34,72,162, .5)',
                shadowBlur: 100,
                shadowColor: 'rgba(34,72,162, 1)'
              }
            },
            data: [
              {
                value: 100
              }
            ]
          },
          {
            name: '',
            type: 'pie',
            startAngle: 90,
            radius: radius3,
            hoverAnimation: false,
            center: ['50%', '50%'],
            itemStyle: {
              normal: {
                labelLine: {
                  show: false
                },
                color: 'rgba(34,72,162, .7)',
                shadowBlur: 100,
                shadowColor: 'rgba(34,72,162, 1)'
              }
            },
            data: [
              {
                value: 100
              }
            ]
          },
          {
            name: '',
            type: 'pie',
            startAngle: 90,
            radius: radius4,
            hoverAnimation: false,
            center: ['50%', '50%'],
            itemStyle: {
              normal: {
                labelLine: {
                  show: false
                },
                color: 'rgba(34,72,162, 0.9)',
                shadowBlur: 300,
                shadowColor: 'rgba(100,143,244, 0.5)'
              }
            },
            data: [
              {
                value: 100
              }
            ]
          },
          {
            type: 'pie',
            hoverAnimation: false,
            legendHoverLink: false,
            radius: radius,
            z: 10,
            labelLine: {
              normal: {
                show: false
              }
            },
            // 模拟中间文字
            label: {
              show: false
            },
            silent: true,
            data: [
              {
                value: 0,
                itemStyle: {
                  color: {
                    type: 'radial',
                    x: 0.5,
                    y: 0.5,
                    r: 0.5,
                    colorStops: [
                      {
                        offset: 0,
                        color: 'rgba(2, 11, 30, 1)' // 0% 处的颜色
                      },
                      {
                        offset: 0.9,
                        color: 'rgba(2, 11, 30, 1)' // 50% 处的颜色
                      },
                      {
                        offset: 1,
                        color: 'rgba(19, 106, 237, 0.3)' // 100% 处的颜色
                      }
                    ],
                    global: false // 缺省为 false
                  }
                }
              }
            ]
          }
        ]
      }
      this.myEcharts.setOption(option)
    },
    paint() {
      // data = data[0]
      // console.log(data[0], '打印的值');
      // this.myEcharts.clear()
      let title = [
        {
          text: this.data + '%',
          x: 'center',
          top: '52%',
          textStyle: {
            color: 'yellow',
            fontSize: 25,
            fontWeight: '600'
          },
          z: 100
        },
        {
          text: '训练进度',
          x: 'center',
          top: '42%',
          textStyle: {
            fontSize: '30',
            color: '#fdf914',
            fontFamily: 'Lato',
            foontWeight: '100'
          },
          z: 100
        }
      ]
      let series = [
        {
          name: '',
          type: 'bar',
          roundCap: true,
          barWidth: 60,
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(0, 0, 0,1)'
          },
          data: [this.data],
          coordinateSystem: 'polar',

          itemStyle: {
            normal: {
              color: new this.$echarts.graphic.LinearGradient(0, 1, 0, 0, [
                {
                  offset: 0,
                  color: '#00FFC0'
                },
                {
                  offset: 1,
                  color: '#136AED'
                }
              ])
            }
          }
        },
        {
          name: '',
          type: 'pie',
          startAngle: 90,
          radius: radius2,
          hoverAnimation: false,
          center: ['50%', '50%'],
          itemStyle: {
            normal: {
              labelLine: {
                show: false
              },
              color: 'rgba(34,72,162, .5)',
              shadowBlur: 100,
              shadowColor: 'rgba(34,72,162, 1)'
            }
          },
          data: [
            {
              value: 100
            }
          ]
        },
        {
          name: '',
          type: 'pie',
          startAngle: 90,
          radius: radius3,
          hoverAnimation: false,
          center: ['50%', '50%'],
          itemStyle: {
            normal: {
              labelLine: {
                show: false
              },
              color: 'rgba(34,72,162, .7)',
              shadowBlur: 100,
              shadowColor: 'rgba(34,72,162, 1)'
            }
          },
          data: [
            {
              value: 100
            }
          ]
        },
        {
          name: '',
          type: 'pie',
          startAngle: 90,
          radius: radius4,
          hoverAnimation: false,
          center: ['50%', '50%'],
          itemStyle: {
            normal: {
              labelLine: {
                show: false
              },
              color: 'rgba(34,72,162, 0.9)',
              shadowBlur: 300,
              shadowColor: 'rgba(100,143,244, 0.5)'
            }
          },
          data: [
            {
              value: 100
            }
          ]
        },
        {
          type: 'pie',
          hoverAnimation: false,
          legendHoverLink: false,
          radius: radius,
          z: 10,
          labelLine: {
            normal: {
              show: false
            }
          },
          // 模拟中间文字
          label: {
            show: false
          },
          silent: true,
          data: [
            {
              value: 0,
              itemStyle: {
                color: {
                  type: 'radial',
                  x: 0.5,
                  y: 0.5,
                  r: 0.5,
                  colorStops: [
                    {
                      offset: 0,
                      color: 'rgba(2, 11, 30, 1)' // 0% 处的颜色
                    },
                    {
                      offset: 0.9,
                      color: 'rgba(2, 11, 30, 1)' // 50% 处的颜色
                    },
                    {
                      offset: 1,
                      color: 'rgba(19, 106, 237, 0.3)' // 100% 处的颜色
                    }
                  ],
                  global: false // 缺省为 false
                }
              }
            }
          ]
        }
      ]
      try {
        this.myEcharts.setOption({
          title: title,
          series: series
        })
      } catch (error) {
        console.warn(error)
      }
    }
  }
}
</script>

<style scoped>
.echarts {
  /* background-color: #ffffff99; */
  width: 100%;
  height: 100%;
  margin: auto;
}
</style> -->
