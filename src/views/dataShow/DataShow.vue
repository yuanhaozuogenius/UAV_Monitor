<script setup>
import lineChart from '@/components/MonitoringPage/LineChart.vue'
import {sysGetNumberService} from '@/api/system'
import {ref} from 'vue'
import {generateRandomData} from '@/utils/Constant'


// 定义常数
const chartRef = ref(null);


// 生成包含10个键的数据
const obj = generateRandomData(10);
console.log("obj:", obj);
// Object.keys(obj).forEach((key, index) => {
//   const data = obj[key];  // 获取整个数据数组
//   if (data !== undefined) {
//     actualVars[index].value = safeSlice(data, 0, 25);  // 更新前 26 个实际值
//   }
// });
// console.log("actualVars:", actualVars);

const times = ref([])
const actual = ref([])
let forecast = new Array(30).fill(null);

// 获取系统工况数
const numberList = ref({})
const getNumberList = async () => {
  const res = await sysGetNumberService()
  // 将获取到的设备数进行赋值
  numberList.value = res.data.data[0]
}
getNumberList()
</script>

<template>
  <div class="datashow">
    <el-col class="page-container">
      <el-row :span="8" class="chart-column">
        <div class="panel">
          <h2>位置</h2>
          <div class="troublehandle">
            <lineChart ref="xChart"></lineChart>
          </div>
        </div>
        <div class="panel">
          <h2>速度</h2>
          <div class="troublehandle">
            <lineChart ref="v-xChart"></lineChart>
          </div>
        </div>
      </el-row>

      <el-row :span="8" class="chart-column">
        <div class="panel">
          <h2>角速度</h2>
          <div class="troublehandle">
            <lineChart ref="w-xChart"></lineChart>
          </div>
        </div>

        <div class="panel">
          <h2>加速度</h2>
          <div class="troublehandle">
            <lineChart ref="a-xChart"></lineChart>
          </div>
        </div>
      </el-row>

    </el-col>
  </div>
</template>

<style lang="scss" scoped>
.datashow-title {
  margin: 1rem auto;
  text-align: center;
  font-size: 1.8rem;
  color: #81e7ed;
  //height: 3rem;
  //line-height: 3rem;
  //text-align: center;
  //color: #81e7ed;
  //font-size: 1.25rem;
  //font-weight: 600;
}

.datashow {
  // height: calc(100vh - 200px);
  height: 100%;
  //padding: 2vh 0;
  padding: 200px 0;

  .page-container {
    height: 100%;
    //height: 100vh;
    overflow-y: auto; // 允许垂直滚动
    display: flex;
    flex-direction: column; // 垂直布局
    //flex-wrap: wrap; // 确保折线图换行显示
  }

  .chart-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  .top-aside, .middle-aside, .accelerator-aside, .bottom-aside {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    flex: 1; // 上中下部分各自占用同等高度，或根据需要调整比例
    padding: 10px;
  }

  .panel {
    flex-basis: 35%; // 每个折线图的初始宽度，占30%空间
    flex-grow: 1; // 允许每个折线图根据可用空间拉伸
    flex-shrink: 1; // 当空间不足时允许压缩
    box-sizing: border-box;
    width: 80%;
    position: relative;
    border: 1px solid rgba(25, 186, 139, 0.17);
    background: rgba(255, 255, 255, 0.04) url('@/assets/line.png');
    // padding: 0 0.9375rem 2.5rem;
    padding: 1rem;
    //margin-bottom: 1px;
    margin: 3rem; // 增加外边距，确保面板之间有足够的留白

    .devicelist li {
      float: left;
      width: 33%;
      padding: 10px 0;
      text-align: center;
    }

    .device {
      width: 100px;
      height: 100px;
      margin: 0 auto 10px auto;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 30px;
      font-family: electronicFont;
      color: #fff32b;
    }

    .devicelist li span {
      opacity: 0.8;
      font-size: 16px;
      color: #fff;
      // color: #02a6b5;
      font-weight: 100;
    }

    .device:before {
      position: absolute;
      width: 100%;
      height: 100%;
      content: '';
      background: url('@/assets/img1.png') center center;
      border-radius: 100px;
      background-size: 100% 100%;
      opacity: 0.3;
      left: 0;
      top: 0;
      animation: myfirst2 15s infinite linear;
    }

    .device:after {
      position: absolute;
      width: 86%;
      background: url('@/assets/img2.png') center center;
      border-radius: 100px;
      background-size: 100% 100%;
      opacity: 0.3;
      height: 86%;
      content: '';
      left: 7%;
      top: 7%;
      animation: myfirst 15s infinite linear;
    }

    @keyframes myfirst {
      to {
        transform: rotate(-360deg);
      }
    }
    @keyframes myfirst2 {
      to {
        transform: rotate(360deg);
      }
    }

    .troublehandle {
      height: 20vh;
      width: 100%;
    }

    .probability {
      height: 14vh;
      width: 100%;
    }

    .panel-footer {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
    }
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

  // .content {
  //   // background-color: blue;
  //   // margin: 0 0.125rem 0.1875rem;
  //   // overflow: hidden;
  // }
}

</style>
