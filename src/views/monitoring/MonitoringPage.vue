<script setup>
import echarts from '@/Echarts/echarts'
import 'echarts-gl'
import {onMounted, ref} from 'vue'
import {DataZoomComponent, VisualMapComponent} from 'echarts/components'
import curveGraph from '@/components/MonitoringPage/CurveGraph.vue'
import radarGraph from '@/components/MonitoringPage/radarGraph.vue'
import {sysGet3dCurveService, sysGetPhysicalListService} from '@/api/system'
import {Search} from '@element-plus/icons-vue'

echarts.use([DataZoomComponent, VisualMapComponent])
// echarts实体
const timecurve = ref(null)
const curve3d = ref(null)
const option = {
  dataZoom: [
    {
      id: 'dataZoomX',
      type: 'inside',
      xAxisIndex: [0],
      filterMode: 'inside'
    }
  ],
  grid: {
    top: '10%',
    left: '5%',
    right: '5%',
    bottom: '0%',
    containLabel: true
  },
  tooltip: {
    // trigger: 'axis',
    // axisPointer: { type: 'cross' }
    show: true
  },
  legend: {
    top: '1%',
    right: '5%',
    textStyle: {
      color: '#fff',
      opacity: 0.7
    }
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    axisLine: {onZero: false},

    data: []
  },
  yAxis: {},
  series: [
    {
      name: 'A1',
      data: [],
      type: 'line',
      smooth: true
    },
    {
      name: 'A2',
      data: [],
      type: 'line',
      smooth: true
    }
  ]
}

const option3d = {
  tooltip: {},

  // backgroundColor: '#fff',
  visualMap: {
    show: false,
    dimension: 2,
    min: -1,
    max: 1,
    inRange: {
      color: [
        '#313695',
        '#4575b4',
        '#74add1',
        '#abd9e9',
        '#e0f3f8',
        '#ffffbf',
        '#fee090',
        '#fdae61',
        '#f46d43',
        '#d73027',
        '#a50026'
      ]
    }
  },
  xAxis3D: {
    type: 'value',
    axisLabel: {
      textStyle: {
        color: '#fff' // 修改 x 轴字体颜色为红色
      }
    },
    axisPointer: {
      //坐标指示器的线
      type: 'line',
      lineStyle: {
        color: '#fff',
        width: 1,
        type: 'solid'
      }
    }
  },
  yAxis3D: {
    type: 'value',
    axisLabel: {
      textStyle: {
        color: '#fff' // 修改 x 轴字体颜色为红色
      }
    },
    axisPointer: {
      //坐标指示器的线
      type: 'line',
      lineStyle: {
        color: '#fff',
        width: 1,
        type: 'solid'
      }
    }
  },
  zAxis3D: {
    type: 'value',
    name: 'time',
    axisLabel: {
      textStyle: {
        color: '#fff' // 修改 x 轴字体颜色为红色
      }
    },

    axisPointer: {
      //坐标指示器的线
      type: 'line',
      lineStyle: {
        color: '#fff',
        width: 1,
        type: 'solid'
      }
    }
  },
  grid3D: {
    top: -70,
    // show: true,
    // boxWidth: 110, // 网格宽度
    // boxHeight: 100, // 网格高度
    viewControl: {
      // projection: 'orthographic'
      // distance: 200
    },

    axisLine: {
      lineStyle: {
        color: 'white' // 修改 XYZ 轴的颜色为绿色
      }
    }
  },
  series: [
    {
      name: '3d',
      type: 'surface',
      wireframe: {
        // show: false
      },
      data: []
    }
  ]
}

//  系统实时曲线

// 物理量筛选
// 用于实际与后端联调时打开
const quantityList = ref([])
const getQuantityList = async () => {
  const res = await sysGetPhysicalListService()
  quantityList.value = res.data.data
}

getQuantityList()
const quantitySelect = ref(['A1', 'A2'])

// 时间筛选
const endTime = new Date()
const startTime = new Date()
startTime.setTime(startTime.getTime() - 3600 * 1000 * 24 * 365 * 2)
const getMyDate = (date) => {
  var y = date.getFullYear()
  var m = date.getMonth() + 1
  m = m < 10 ? '0' + m : m
  var d = date.getDate()
  d = d < 10 ? '0' + d : d
  var currentdate = y + '-' + m + '-' + d
  var hh = date.getHours()
  hh = hh < 10 ? '0' + hh : hh
  var mm = date.getMinutes()
  mm = mm < 10 ? '0' + mm : mm
  var ss = date.getSeconds()
  ss = ss < 10 ? '0' + ss : ss
  var time = hh + ':' + mm + ':' + ss
  return currentdate + ' ' + time
}
const timeselectCurve = ref([getMyDate(startTime), getMyDate(endTime)])
const defaultTime = ref([getMyDate(startTime), getMyDate(endTime)])
const shortcuts = [
  {
    text: '最近一周',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
      return [start, end]
    }
  },
  {
    text: '最近一个月',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      return [start, end]
    }
  },
  {
    text: '最近三个月',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
      return [start, end]
    }
  }
]
// 系统三维曲线
// 时间筛选
const timeSelect3d = ref([getMyDate(startTime), getMyDate(endTime)])

// 物理量选择
const quantitySelect1 = ref('A1')
const quantitySelect2 = ref('A2')
const quantitySelect3 = ref('A3')
// 请求参数
const params3D = ref({
  sTime: timeSelect3d.value[0],
  eTime: timeSelect3d.value[1],
  physical1: quantitySelect1.value,
  physical2: quantitySelect2.value,
  physical3: quantitySelect3.value
})
// 曲线参数
let data3D = []
// 时间值
// 时间改变 发送请求 获取系统3d曲线
const handle3DTime = async () => {
  params3D.value.sTime = timeSelect3d.value[0]
  params3D.value.eTime = timeSelect3d.value[1]
  // console.log(params3D.value)
  render3D(params3D.value)
}
// 物理量改变 发送请求 获取系统3d曲线
const handle3dQuantity = async () => {
  params3D.value.sTime = timeSelect3d.value[0]
  params3D.value.eTime = timeSelect3d.value[1]
  params3D.value.physical1 = quantitySelect1.value
  params3D.value.physical2 = quantitySelect2.value
  params3D.value.physical3 = quantitySelect3.value
  // console.log(params3D)
  render3D(params3D.value)
}
// 渲染3d曲线
const render3D = async (params) => {
  const curve3dChart = echarts.init(curve3d.value)
  curve3dChart.setOption(option3d)
  curve3dChart.showLoading({
    text: '加载中...',
    textColor: 'rgba(255,255,255,0.8)',
    color: '#fff',
    fontSize: 16,
    maskColor: '#06164a'
  })
  const res = await sysGet3dCurveService(params)
  if (res.data.data) {
    curve3dChart.hideLoading()

    data3D = res.data.data
    console.log(data3D)
    curve3dChart.setOption({
      series: [
        {
          name: '3d',
          data: data3D
        }
      ]
    })
  }
}
onMounted(() => {
  // const timeCurveChart = echarts.init(timecurve.value)
  // timeCurveChart.setOption(option)
  // 隐藏renderRT曲线
  // renderRT(paramsRT.value)
  // const curve3dChart = echarts.init(curve3d.value)
  // curve3dChart.setOption(option3d)
  render3D(params3D.value)
})
</script>

<template>
  <div class="monitoring">
    <el-row>
      <el-col :span="8" class="left-aside">
        <div class="panel">
          <div class="datashow-title">健康度曲线</div>
          <div class="healthDegree">
            <curveGraph></curveGraph>
          </div>
          <div class="panel-footer"></div>
        </div>

        <!-- 添加留白 -->
        <div style="height: 250px;"></div>

        <!-- 雷达图（Radar Chart）：可以用于同时展示不同时间点的三个欧拉角的状态。-->
        <!--优点：能在二维图上同时呈现三个角度的数值。-->
        <div class="panel">
          <div class="datashow-title">欧拉角雷达图(Roll, Pitch, Yaw)</div>
          <div class="EulerAngles">
            <radarGraph></radarGraph>
          </div>
          <div class="panel-footer"></div>
        </div>
      </el-col>

      <el-col :span="6" class="model">
        <!-- 3D模型或其他展示 -->
        <div class="datashow-title">3D模型展示</div>
        <img src="/src/assets/wurenji.svg" alt="" class="modelPng"/>
        <!--        <div class="timecurve" ref="timecurve" style="width: 100%"></div>-->
        <!-- 中部分：3D模型或其他展示 -->
      </el-col>
      <el-col :span="8">
        <div class="datashow-title">坐标点(x,y)变化情况</div>
        <div class="curve3d" ref="curve3d"></div>
      </el-col>
    </el-row>
  </div>
</template>


<style lang="scss" scoped>

.monitoring {
  // height: calc(100vh - 200px);
  height: 100%;
  padding: 2vh 0;
}

.datashow-title {
  margin: 1rem auto;
  text-align: center;
  font-size: 1.8rem;
  color: #a3c7d6;
}

.timeselect {
  margin-top: 1rem;
  //margin-left: 35vw;
  // width: 20vw;
  // display: flex;
  // justify-content: flex-end;
  // flex-direction: row-reverse;
  // margin-left: 65vw;
}

.timecurve {
  //width: 60vw;
  height: 68vh;
  margin: 0 auto;
  margin-top: 1rem;
}

.curve3d {
  //width: 60vw;
  //margin: 0 auto; // 水平居中
  padding: 150px 0;
  height: 65vh;
  margin: 13% 0 5rem 13%;// 合并所有边距设置，分别为上、右、下、左
  //margin: 0 0.5rem;
  //margin-top: 5rem;
  margin-left: 19%; // 将此值调大可以使图片向右移动
  background: transparent;
}


::v-deep .el-date-editor .el-range-input,
::v-deep .el-date-editor .el-range-separator {
  color: #8eaccd !important;
}

.select-wrapper {
  display: flex;
  align-items: center;
  text-align: center;
}

.search .el-button {
  background-color: #4f709c;
  color: #fff;
}

// .select-label {
//   margin-right: 10px; /* 调整文字与选择框的间距 */
// }
// 输入框的背景
.model {
  width: 100%;
  height: 100%;
  //padding-left: 1rem;
  //padding-right: 1rem;
}

.modelPng {
  padding: 200px 0;
  display: flex;
  margin: 0 auto; // 水平居中
  //justify-content: center; // 水平居中
  //align-items: center; // 垂直居中
  //text-align: center;
  width: 80%;
  height: 90%;
}

.left-aside {
  display: flex;
  flex-direction: column; // 垂直排列子元素
  justify-content: space-between;
  height: 100%; // 确保占满父容器的高度
}

.right-aside {
  // height: 100%;
  // background-color: green;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}

.healthDegree {
  height: 23vh;
  width: 100%;
}

.EulerAngles {
  height: 50%;
  width: 100%;
}

.panel-footer {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
}

.panel::before {
  position: absolute;
  top: 0;
  left: 0;
  content: '';
  width: 10px;
  height: 10px;
  border-top: 2px solid #02a6b5;
  border-left: 2px solid #02a6b5;
  border-radius: 20%;
}

.panel::after {
  position: absolute;
  top: 0;
  right: 0;
  content: '';
  width: 10px;
  height: 10px;
  border-top: 2px solid #02a6b5;
  border-right: 2px solid #02a6b5;
  border-radius: 20%;
}

.panel .panel-footer::before {
  position: absolute;
  bottom: 0;
  left: 0;
  content: '';
  width: 10px;
  height: 10px;
  border-bottom: 2px solid #02a6b5;
  border-left: 2px solid #02a6b5;
  border-radius: 20%;
}

.panel .panel-footer::after {
  position: absolute;
  bottom: 0;
  right: 0;
  content: '';
  width: 10px;
  height: 10px;
  border-bottom: 2px solid #02a6b5;
  border-right: 2px solid #02a6b5;
  border-radius: 20%;
}

.panel h2 {
  height: 3rem;
  line-height: 3rem;
  text-align: center;
  color: #81e7ed;
  font-size: 1.25rem;
  font-weight: 600;
}

.pie {
  height: 22vh;
}
</style>
