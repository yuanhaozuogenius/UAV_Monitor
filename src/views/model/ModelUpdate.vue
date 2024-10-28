<script setup>
// import processPie from '@/components/ModelUpdatePage/processPie.vue'
import { ref, onMounted } from 'vue'
import { dataGetListService } from '@/api/data'
import { sysGetWorkListService } from '@/api/system'
import { modelSubmitService } from '@/api/model'

// 模型选择部分
const svmForm = ref({
  c: '2',
  kernel: 'RBF',
  gamma: '10',
  class_weight: 'balanced'
})
const svmRules = {
  c: [{ required: true, message: '请输入正则参数', trigger: 'blur' }],
  kernel: [{ required: true, message: '请输入核函数', trigger: 'blur' }],
  gamma: [{ required: true, message: '请输入核函数参数', trigger: 'blur' }],
  class_weight: [{ required: true, message: '请输入平衡权重', trigger: 'blur' }]
}
const tcnForm = ref({
  epochs: '20',
  batchSize: '32',
  learningrate: '0.002',
  KernelSize: '5'
})
const tcnRules = {
  epochs: [{ required: true, message: '请输入训练轮次', trigger: 'blur' }],
  batchSize: [{ required: true, message: '请输入批次大小', trigger: 'blur' }],
  learningrate: [
    { required: true, message: '请输入学习速率', trigger: 'blur' }
  ],
  KernelSize: [{ required: true, message: '请输入卷积核尺寸', trigger: 'blur' }]
}

const lstmForm = ref({
  hiddenLayers: '2',
  epochs: '3',
  batchSize: '10',
  learningrate: '0.02'
})
const lstmRules = {
  hiddenLayers: [
    { required: true, message: '请输入隐藏维度', trigger: 'blur' }
  ],
  epochs: [{ required: true, message: '请输入训练论数', trigger: 'blur' }],
  batchSize: [{ required: true, message: '请输入批次大小', trigger: 'blur' }],
  learningrate: [{ required: true, message: '请输入学习速率', trigger: 'blur' }]
}

// 重置
// 重置tcn
const ResetTCN = () => {
  ;(tcnForm.value.epochs = '20'),
    (tcnForm.value.batchSize = '32'),
    (tcnForm.value.learningrate = '0.002'),
    (tcnForm.value.KernelSize = '0.02')
}
// 重置lstm
const ResetLSTM = () => {
  ;(lstmForm.value.hiddenLayers = '2'),
    (lstmForm.value.epochs = '20'),
    (lstmForm.value.batchSize = '10'),
    (lstmForm.value.learningrate = '0.02')
}
// 重置svm
const ResetSVM = () => {
  ;(svmForm.value.c = '2'),
    (svmForm.value.kernel = 'RBF'),
    (svmForm.value.gamma = '10'),
    (svmForm.value.class_weight = 'balanced')
}

// // 数据选择部分
// 获取工况列表
const workConditionList = ref([])
const getWorkConditionList = async () => {
  const res = await sysGetWorkListService()
  workConditionList.value = res.data.data
}
getWorkConditionList()
// 选定的工况
const selectWorkCondition = ref('开调节阀')
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
const defaultTime = ref([getMyDate(startTime), getMyDate(endTime)])
const timeSelect = ref([getMyDate(startTime), getMyDate(endTime)])
console.log(timeSelect.value)
console.log(timeSelect.value)
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
const loading = ref(false)
const dataColumns = ref(['A4', 'A6', 'A12', 'D13']) //初始开调节阀对应的物理量
const dataList = ref([]) //训练数据列表
const dataTotal = ref(0) //训练数据总条数
// 定义请求参数
const params = ref({
  pagenum: 1, //当前页
  pagesize: 10, //当前生效的每页条数
  startTime: timeSelect.value[0],
  endTime: timeSelect.value[1],
  workCondition: selectWorkCondition.value
})
// 基于params参数 获取data列表
const getDataList = async () => {
  params.value.startTime = timeSelect.value[0]
  params.value.endTime = timeSelect.value[1]
  params.value.workCondition = selectWorkCondition.value
  loading.value = true
  console.log(params.value)
  try {
    const res = await dataGetListService(params.value)
    dataList.value = res.data.data
    dataTotal.value = res.data.total
    dataColumns.value = res.data.physicals
    console.log(dataColumns.value)
    loading.value = false
  } catch (err) {
    loading.value = false
  }
}
getDataList()
// 处理分页逻辑 需解开
const onSizeChange = (size) => {
  // console.log('当前每页条数', size)
  // 只要是每页条数变化了 那么原本正在访问的当前页面意义不大了，数据大概率已经不在原来那页了
  params.value.pagenum = 1
  params.value.pagesize = size
  // 基于最新的当前页 和 每页条数 渲染数据
  getDataList()
}
const onCurrentChange = (page) => {
  console.log('页面变化了', page)
  // 更新当前页
  params.value.pagenum = page
  // 基于最新的当前页 渲染数据
  getDataList()
}

// 查询功能
const onSubmit = () => {
  params.value.pagenum = 1
  getDataList()
}

// 训练的参数
const trainParams = {
  functionParams: '',
  type: '',
  workCondition: selectWorkCondition.value,
  sTime: timeSelect.value[0],
  eTime: timeSelect.value[1]
}
//  提交训练的算法参数
const submitForm = async (form, type) => {
  dialogTableVisible.value = true
  trainParams.type = type
  trainParams.functionParams = JSON.stringify(form)
  trainParams.workCondition = selectWorkCondition.value
  trainParams.sTime = timeSelect.value[0]
  trainParams.eTime = timeSelect.value[1]
  console.log(trainParams.functionParams)
  try {
    const res = await modelSubmitService(trainParams)
    dialogTableVisible.value = false
    ElMessage.success(res.data.message)
  } catch (err) {
    dialogTableVisible.value = false
  }
}
// 进度条
const dialogTableVisible = ref(false)
const percentage = ref(0)
const colors = [
  { color: '#f56c6c', percentage: 20 },
  { color: '#e6a23c', percentage: 40 },
  { color: '#5cb87a', percentage: 60 },
  { color: '#1989fa', percentage: 80 },
  { color: '#6f7ad3', percentage: 100 }
]
onMounted(() => {
  setInterval(() => {
    percentage.value = (percentage.value % 100) + 10
  }, 20000)
})
</script>

<template>
  <div class="container">
    <el-row class="update-page">
      <el-col :span="21" :offset="1">
        <div class="dataselect">
          <div class="dataselect-title">  </div>
          <!-- 筛选框 -->
          <el-form inline :model="formInline" class="timeselect">
            <el-form-item>
              <el-select
                v-model="selectWorkCondition"
                placeholder="请选择工况"
                style="width: 180px; text-align: center"
              >
                <el-option
                  v-for="item in workConditionList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-date-picker
                :popper-append-to-body="false"
                popper-class="selectStyle"
                style="width: 100%; box-sizing: border-box; background-color: #2b3467; border: 0.5px solid #d2e0fb; box-shadow: none;"
                v-model="timeSelect"
                type="datetimerange"
                :shortcuts="shortcuts"
                range-separator="至"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                :default-time="defaultTime"
                value-format="YYYY-MM-DD HH:mm:ss"
              />
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                @click="onSubmit"
                style="background-color: #2c74b3; color: rgba(255, 255, 255, 0.8); box-shadow: none;"
              >查询</el-button>
            </el-form-item>
          </el-form>

          <el-table
            max-height="60vh"
            :data="dataList"
            border
            style="width: 90vw"
            :cell-style="{ 'text-align': 'center' }"
            :row-style="{
              background: '#0A2647',
              color: '#fff',
              'font-size': '16px'
            }"
            :header-cell-style="{
              background: '#00337C !important',
              color: '#fff',
              'text-align': 'center',
              'font-size': '18px'
            }"
            v-loading="loading"
            element-loading-text="加载中..."
            element-loading-background="#06164a"
            value-format
          >
            <el-table-column
              label="数据产生时间"
              prop="dataTime"
              fixed
              width="200"
            />
            <el-table-column label="工况" prop="workCondition" fixed />
            <el-table-column
              v-for="item in dataColumns"
              :prop="item"
              :label="item"
              :key="item"
            />

            <template #empty>
              <el-empty description="没有数据"></el-empty>
            </template>
          </el-table>

          <el-pagination
            v-model:current-page="params.pagenum"
            v-model:page-size="params.pagesize"
            :page-sizes="[10, 20, 30, 40]"
            layout="total,  prev, pager, next, ->,jumper, sizes,"
            :total="dataTotal"
            @current-change="onCurrentChange"
            @size-change="onSizeChange"
            style="margin-right: 0; margin-top: 1rem"
            :pager-count="11"
            background
          ></el-pagination>
          <!-- 分页器 -->

        </div>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>
/* .process {
  width: 200px;
  height: 200px;
} */

.container {
  //display: flex;
  //justify-content: center;
  //align-items: center;
  //min-height: 100vh;
  padding: 50px 0;
  //box-sizing: border-box;
}
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.modelselect-title {
  text-align: center;
  margin: 1rem auto;
  font-size: 1.8rem;
  color: #a3c7d6;
  line-height: 1.5;
}
.dataselect {
  .dataselect-title {
    text-align: center;
    margin: 1rem auto;
    margin-bottom: 2.8rem;
    /* margin-bottom: 3rem; */
    font-size: 1.8rem;
    color: #a3c7d6;
    line-height: 1.5;
  }
  .timeselect {
    /* display: inline-block; */
    display: flex;
    justify-content: space-between;
  }
}
::v-deep .el-table__body tr:hover > td {
  background: #6e85b7 !important;
}
.card {
  padding: 2rem;
  text-align: center;
  font-size: 1.8rem;
  /* color: #6e85b7; */
  color: rgba(255, 255, 255, 0.8);
}
/* .box-title {
  margin-bottom: 1.2rem;
} */
.content {
  width: 300px;
  margin: 0 auto;
}
.button {
  text-align: center;
  padding-left: 1.5rem;
}
.form {
  margin: 0 auto;
  padding: 0 2.4rem;
  text-align: center;
  /* .el-input {
    --el-input-width: 180px;
  } */
}
.box-title {
  position: absolute;
  left: 40%;
  top: 40%;
  font-size: 38px;
  line-height: 38px;
  /* height: 38px;
  height: calc(38vh * 100 / 1080);
  color: #02aafa;
  text-align: center;
  top: calc(50% - (19vh * 100 / 1080));
  font-size: 38px;
  line-height: 38px;
  letter-spacing: 1px; */
  opacity: 0.5;
  transition: 1s;
}

.el-carousel__item.is-active:hover .box-title {
  top: 2rem;
  opacity: 1;
  /* background-color: #fff; */
}
/* .card:hover .detailButton {
  opacity: 0;
} */
/* .detailButton {
  position: absolute;
  width: calc(90vw * 100 / 1920);
  height: calc(30vh * 100 / 1080);
  background: black;
  color: #02aafa;
  right: 5%;
  text-align: center;
  font-size: 14px;
  opacity: 0;
} */
[class^='box'] .content {
  position: absolute;
  left: 0px;
  right: 0px;
  bottom: 0px;
  /* background: rgba(0, 0, 0, 0.4); */
  color: #fff;
  display: flex;
  align-items: center;
  flex-direction: column;
  opacity: 0;
  transition: 2s;
}

.el-carousel__item.is-active:hover .content {
  opacity: 1;
}
/* .card:hover .middle .content,
.middle .content {
  opacity: 1 !important;
} */
::v-deep .el-date-editor .el-range-input,
::v-deep .el-date-editor .el-range-separator {
  color: #8eaccd !important;
}
::v-deep .el-form-item__label {
  color: rgba(255, 255, 255, 0.9);
}
::v-deep .el-button {
  background-color: #4d5d96;
  border: #6e85b7;
}
/* ::v-deep .el-overlay {
  background-color: #7c96ab !important;
} */
::v-deep .el-table {
  background-color: transparent;
}
::v-deep .el-table__body {
  height: 55vh !important;
}
</style>
