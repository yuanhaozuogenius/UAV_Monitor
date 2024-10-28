<script setup>
import { ref } from 'vue'
import {
  modelGetOptionsService,
  modelGetListService,
  modelActivateService,
  modelGetCurrentService
} from '@/api/model'
import { sysGetWorkListService } from '@/api/system'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import { Search } from '@element-plus/icons-vue'
const locale = ref(zhCn)
const loading = ref(false)
// 工况筛选
// 获取工况列表
const workConditionList = ref([])
const getWorkConditionList = async () => {
  const res = await sysGetWorkListService()
  workConditionList.value = res.data.data
}
getWorkConditionList()
// 选定的工况
const selectWorkCondition = ref('开调节阀')
// const quantityList = ref([
//   {
//     value: '开调节阀',
//     label: '开调节阀'
//   },
//   {
//     value: '开主汽阀',
//     label: '开主汽阀'
//   },
//   {
//     value: '活动试验关调节阀',
//     label: '活动试验关调节阀'
//   },
//   {
//     value: '活动试验关主汽阀',
//     label: '活动试验关主汽阀'
//   },
//   {
//     value: '快关调节阀',
//     label: '快关调节阀'
//   },
//   {
//     value: '快关主汽阀',
//     label: '快关主汽阀'
//   }
// ])
// 获取算法选项
const selectedAlgName = ref('TCN')
const modelOption = ref([])
const getmodelOption = async () => {
  const res = await modelGetOptionsService()
  modelOption.value = res.data.data
}
getmodelOption()

// 获取算法列表
const modelList = ref([]) //算法列表
const modelTotal = ref(0) //算法总条数

// 当前应用的算法模型
const selectData = ref([
  {
    workCondition: '开调节阀',
    algName: 'SVM',
    c: '2',
    kernel: 'RBF',
    gamma: '10',
    class_weight: 'balanced',
    score: '90',
    isactive: '是',
    createTime: '2023-12-01 08:09:14'
  }
])

const selectedColumns = ref([
  {
    title: '工况',
    dataIndex: 'workCondition',
    key: 'workCondition'
  },
  {
    title: '算法名称',
    dataIndex: 'algName',
    key: 'algName'
  },
  {
    title: '正则参数',
    dataIndex: 'c',
    key: 'c'
  },
  {
    title: '内核函数',
    dataIndex: 'kernel',
    key: 'kernel'
  },
  {
    title: '函数参数',
    dataIndex: 'gamma',
    key: 'gamma'
  },
  {
    title: '平衡权值',
    dataIndex: 'class_weight',
    key: 'class_weight'
  },
  {
    title: '训练得分',
    dataIndex: 'score',
    key: 'score'
  },
  {
    title: '是否激活',
    dataIndex: 'isactive',
    key: 'isactive'
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime'
  }
])
// 获取当前应用的算法模型
const getCurrentModel = async () => {
  const res = await modelGetCurrentService()
  selectData.value = res.data.data
  selectedColumns.value = res.data.col
}
getCurrentModel()
// 待应用的算法模型
const toSelectedColumns = ref([
  {
    title: '工况',
    dataIndex: 'workCondition',
    key: 'workCondition'
  },
  {
    title: '算法名称',
    dataIndex: 'algName',
    key: 'algName'
  },
  {
    title: '正则参数',
    dataIndex: 'c',
    key: 'c'
  },
  {
    title: '内核函数',
    dataIndex: 'kernel',
    key: 'kernel'
  },
  {
    title: '函数参数',
    dataIndex: 'gamma',
    key: 'gamma'
  },
  {
    title: '平衡权值',
    dataIndex: 'class_weight',
    key: 'class_weight'
  },
  {
    title: '训练得分',
    dataIndex: 'score',
    key: 'score'
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime'
  }
])
const toSelectedColumnsSVM = [
  {
    title: '工况',
    dataIndex: 'workCondition',
    key: 'workCondition'
  },
  {
    title: '算法名称',
    dataIndex: 'algName',
    key: 'algName'
  },
  {
    title: '正则参数',
    dataIndex: 'c',
    key: 'c'
  },
  {
    title: '内核函数',
    dataIndex: 'kernel',
    key: 'kernel'
  },
  {
    title: '函数参数',
    dataIndex: 'gamma',
    key: 'gamma'
  },
  {
    title: '平衡权值',
    dataIndex: 'class_weight',
    key: 'class_weight'
  },
  {
    title: '训练得分',
    dataIndex: 'score',
    key: 'score'
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime'
  }
]
const toSelectedColumnsLSTM = [
  {
    title: '算法名称',
    dataIndex: 'algName',
    key: 'algName'
  },
  {
    title: '隐藏维度',
    dataIndex: 'hiddenLayers',
    key: 'hiddenLayers'
  },
  {
    title: '训练论数',
    dataIndex: 'epochs',
    key: 'epochs'
  },
  {
    title: '批次大小',
    dataIndex: 'batchSize',
    key: 'batchSize'
  },
  {
    title: '学习速率',
    dataIndex: 'learningrate',
    key: 'learningrate'
  },
  {
    title: '训练得分',
    dataIndex: 'score',
    key: 'score'
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime'
  }
]
const toSelectedColumnsTCN = [
  {
    title: '算法名称',
    dataIndex: 'algName',
    key: 'algName'
  },
  {
    title: '训练轮次',
    dataIndex: 'epochs',
    key: 'epochs'
  },
  {
    title: '批次大小',
    dataIndex: 'batchSize',
    key: 'batchSize'
  },
  {
    title: '学习速率',
    dataIndex: 'learningrate',
    key: 'learningrate'
  },
  {
    title: '卷积尺寸',
    dataIndex: 'KernelSize',
    key: 'KernelSize'
  },
  {
    title: '训练得分',
    dataIndex: 'score',
    key: 'score'
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime'
  }
]
// 定义请求参数对象
const params = ref({
  pagenum: 1, //当前页
  pagesize: 10, //当前生效的每页条数
  workCondition: selectWorkCondition.value,
  model: selectedAlgName.value //选择的算法名称
})
// // 基于params参数 获取model列表
const getModelList = async () => {
  loading.value = true
  switch (selectedAlgName.value) {
    case 'SVM':
      toSelectedColumns.value = toSelectedColumnsSVM
      break
    case 'LSTM':
      toSelectedColumns.value = toSelectedColumnsLSTM
      break
    case 'TCN':
      toSelectedColumns.value = toSelectedColumnsTCN
      break
    default:
      break
  }
  ;(params.value.workCondition = selectWorkCondition.value),
    (params.value.model = selectedAlgName.value)
  console.log(params.value)
  try {
    modelList.value = ''
    modelTotal.value = ''
    const res = await modelGetListService(params.value)
    modelList.value = res.data.data
    modelTotal.value = res.data.total
    loading.value = false
  } catch (err) {
    loading.value = false
  }
}
getModelList()
// 激活模型
const algChange = async (index, row) => {
  // console.log(index, row)
  const res = await modelActivateService(row)
  getCurrentModel()
  ElMessage.success(res.data.message)
  // row.isactive = '是'
  // selectData.value = [row]
}
// 处理分页逻辑 需解开
const onSizeChange = (size) => {
  // console.log('当前每页条数', size)
  // 只要是每页条数变化了 那么原本正在访问的当前页面意义不大了，数据大概率已经不在原来那页了
  params.value.pagenum = 1
  params.value.pagesize = size
  // 基于最新的当前页 和 每页条数 渲染数据
  getModelList()
}
const onCurrentChange = (page) => {
  console.log('页面变化了', page)
  // 更新当前页
  params.value.pagenum = page
  // 基于最新的当前页 渲染数据
  getModelList()
}

// const options = [
//   {
//     value: 'SVM',
//     label: 'SVM'
//   },
// {
//   value: 'RF',
//   label: 'RF'
// },
// {
//   value: 'RNN',
//   label: 'RNN'
// },
//   {
//     value: 'LSTM',
//     label: 'LSTM'
//   },
//   {
//     value: 'TCN',
//     label: 'TCN'
//   }
// ]

// const toSelectedDataSVM = ref([])
// for (let i = 0; i < 1000; i++) {
//   toSelectedDataSVM.value.push({
//     workCondition: '开调节阀',
//     algName: 'SVM',
//     c: '2',
//     kernel: 'RBF',
//     gamma: '10',
//     class_weight: 'balanced',
//     score: '90',
//     createTime: '2022-03-14 08:09:14'
//   })
// }
// RF的表格和静态数据
// const toSelectedColumnsRF = [
//   {
//     title: '算法名称',
//     dataIndex: 'algName',
//     key: 'algName'
//   },
//   {
//     title: '惩罚参数',
//     dataIndex: 'penalty',
//     key: 'penalty'
//   },
//   {
//     title: '内核类型',
//     dataIndex: 'kernelInfo',
//     key: 'kernelInfo'
//   },
//   {
//     title: '函数参数',
//     dataIndex: 'parameters',
//     key: 'parameters'
//   },
//   {
//     title: '权值分配',
//     dataIndex: 'weightList',
//     key: 'weightList'
//   },
//   {
//     title: '训练得分',
//     dataIndex: 'score',
//     key: 'score'
//   },
//   {
//     title: '创建时间',
//     dataIndex: 'createTime',
//     key: 'createTime'
//   }
// ]
// const toSelectedDataRF = ref([])
// for (let i = 0; i < 10; i++) {
//   toSelectedDataRF.value.push({
//     algName: 'RF',
//     penalty: '2',
//     kernelInfo: 'RBF',
//     parameters: '10',
//     weightList: 'balanced',
//     score: '90',
//     createTime: '2022-03-14 08:09:14'
//   })
// }
// // RNN的表格和静态数据
// const toSelectedColumnsRNN = [
//   {
//     title: '算法名称',
//     dataIndex: 'algName',
//     key: 'algName'
//   },
//   {
//     title: '惩罚参数',
//     dataIndex: 'penalty',
//     key: 'penalty'
//   },
//   {
//     title: '内核类型',
//     dataIndex: 'kernelInfo',
//     key: 'kernelInfo'
//   },
//   {
//     title: '函数参数',
//     dataIndex: 'parameters',
//     key: 'parameters'
//   },
//   {
//     title: '权值分配',
//     dataIndex: 'weightList',
//     key: 'weightList'
//   },
//   {
//     title: '训练得分',
//     dataIndex: 'score',
//     key: 'score'
//   },
//   {
//     title: '创建时间',
//     dataIndex: 'createTime',
//     key: 'createTime'
//   }
// ]
// const toSelectedDataRNN = ref([])
// for (let i = 0; i < 10; i++) {
//   toSelectedDataRNN.value.push({
//     algName: 'RNN',
//     penalty: '2',
//     kernelInfo: 'RBF',
//     parameters: '10',
//     weightList: 'balanced',
//     score: '90',
//     createTime: '2022-03-14 08:09:14'
//   })
// }
// // LSTM的表格和静态数据

// const toSelectedDataLSTM = ref([])
// for (let i = 0; i < 10; i++) {
//   toSelectedDataLSTM.value.push({
//     algName: 'LSTM',
//     penalty: '2',
//     kernelInfo: 'RBF',
//     parameters: '10',
//     weightList: 'balanced',
//     score: '90',
//     createTime: '2022-03-14 08:09:14'
//   })
// }
// // TCN的表格和静态数据

// const toSelectedDataTCN = ref([])
// for (let i = 0; i < 10; i++) {
//   toSelectedDataTCN.value.push({
//     algName: 'TCN',
//     penalty: '2',
//     kernelInfo: 'RBF',
//     parameters: '10',
//     weightList: 'balanced',
//     score: '90',
//     createTime: '2022-03-14 08:09:14'
//   })
// }

// var toSelectedData = toSelectedDataSVM
// var toSelectedColumns = toSelectedColumnsSVM
// const tableData = ref([])
// const currentPage = ref(1)
// const pageSize = ref(10)
// const total = ref(10)
// const getData = (page, pageSize) => {
//   // console.log(toSelectedData.value.slice)
//   tableData.value = toSelectedData.value.slice(
//     (page - 1) * pageSize,
//     page * pageSize
//   )
//   // console.log(toSelectedData.value)
//   total.value = toSelectedData.value.length
// }
// const handleSizeChange = (val) => {
//   pageSize.value = val
//   getData(currentPage.value, pageSize.value)
// }
// const handleCurrentChange = (val) => {
//   currentPage.value = val
//   getData(currentPage.value, pageSize.value)
// }

// watch(selectedAlgName, (newValue) => {
//   // console.log(newValue)
//   switch (newValue) {
//     case 'SVM':
//       toSelectedData = toSelectedDataSVM
//       toSelectedColumns = toSelectedColumnsSVM
//       getData(1, pageSize.value)
//       break
//     case 'RNN':
//       toSelectedData = toSelectedDataRNN
//       toSelectedColumns = toSelectedColumnsRNN
//       getData(1, pageSize.value)
//       break
//     case 'LSTM':
//       toSelectedData = toSelectedDataLSTM
//       toSelectedColumns = toSelectedColumnsLSTM
//       getData(1, pageSize.value)
//       break
//     case 'TCN':
//       toSelectedData = toSelectedDataTCN
//       toSelectedColumns = toSelectedColumnsTCN
//       getData(1, pageSize.value)
//       break
//     case 'RF':
//       toSelectedData = toSelectedDataRF
//       toSelectedColumns = toSelectedColumnsRF
//       getData(1, pageSize.value)
//       break
//     default:
//       break
//   }
// })
// getData(1, pageSize.value)
</script>

<template>
  <div class="imp-container">
    <div class="title current-title">已激活模型</div>
    <div class="current-table">
      <el-table
        :data="selectData"
        border
        style="width: 90vw"
        :cell-style="{ 'text-align': 'center' }"
        :row-style="{ background: '#205295', color: '#fff' }"
        :header-cell-style="{
          'text-align': 'center',
          'font-size': '18px',
          background: '#2C74B3 !important',
          color: '#fff'
        }"
        stripe
      >
        <el-table-column
          v-for="item in selectedColumns"
          :prop="item.dataIndex"
          :label="item.title"
          :key="item.dataIndex"
        />
      </el-table>
    </div>

    <div class="title">待激活模型</div>
    <div class="chosetable">
      <el-config-provider :locale="locale">
        <!-- 算法选择 -->
        <el-row>
          <el-col :span="3">
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
          </el-col>
          <el-col :span="2">
            <el-select
              ref="select"
              v-model="selectedAlgName"
              class="chosemodel"
              placeholder="SVM"
              style="width: 120px; margin-bottom: 1rem"
            >
              <el-option
                v-for="model in modelOption"
                :key="model.id"
                :label="model.algorithmName"
                :value="model.algorithmName"
              /> </el-select
          ></el-col>
          <el-col :span="2">
            <el-button :icon="Search" circle @click="getModelList" />
          </el-col>
        </el-row>

        <!-- 直接替换下面的 -->
        <!-- <el-select
          ref="select"
          v-model="params.model"
          class="chosemodel"
          placeholder="SVM"
          style="width: 120px; margin-bottom: 1rem"
        >
          <el-option
            v-for="model in modelOption"
            :key="model.id"
            :label="model.algorithmName"
            :value="model.id"
          />
        </el-select> -->
        <!-- 算法数据 -->
        <!-- <el-table
          :data="tableData"
          border
          style="width: 90vw"
          :cell-style="{ 'text-align': 'center' }"
          :row-style="{ background: '#0A2647', color: '#fff' }"
          :header-cell-style="{
            'text-align': 'center',
            'font-size': '18px',
            background: '#00337C !important',
            color: '#fff'
          }"
        >
          <el-table-column
            v-for="item in toSelectedColumns"
            :prop="item.dataIndex"
            :label="item.title"
            :key="item.key"
          />
          <el-table-column label="操作">
            <template #default="scope">
              <el-button
                link
                type="primary"
                size="small"
                @click="algChange(scope.$index, scope.row)"
                >激活此模型</el-button
              >
            </template>
          </el-table-column>
          <template #empty>
            <el-empty description="没有数据"></el-empty>
          </template>
        </el-table> -->
        <!-- 直接替换下面的 -->
        <el-table
          max-height="45vh"
          v-loading="loading"
          element-loading-text="加载中..."
          element-loading-background="#06164a"
          :data="modelList"
          border
          style="width: 90vw"
          :cell-style="{ 'text-align': 'center' }"
          :row-style="{ background: '#0A2647', color: '#fff' }"
          :header-cell-style="{
            'text-align': 'center',
            'font-size': '18px',
            background: '#00337C !important',
            color: '#fff'
          }"
        >
          <el-table-column
            v-for="item in toSelectedColumns"
            :prop="item.dataIndex"
            :label="item.title"
            :key="item.key"
          />
          <el-table-column label="操作">
            <template #default="scope">
              <el-button
                link
                type="primary"
                size="small"
                @click="algChange(scope.$index, scope.row)"
                >激活此模型</el-button
              >
            </template>
          </el-table-column>
          <template #empty>
            <el-empty description="没有数据"></el-empty>
          </template>
        </el-table>

        <el-pagination
          v-model:current-page="params.pagenum"
          v-model:page-size="params.pagesize"
          :page-sizes="[10, 20, 30, 40]"
          layout="total,  prev, pager, next, ->,jumper, sizes,"
          :total="modelTotal"
          @current-change="onCurrentChange"
          @size-change="onSizeChange"
          style="margin-right: 0; margin-top: 1rem"
          background
        ></el-pagination>

        <!-- 分页器 -->
        <!-- <el-pagination
          v-model:current-page="currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pageSize"
          layout="total,  prev, pager, next, ->,jumper"
          :total="total"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
          style="margin-right: 0; margin-top: 1rem"
          :pager-count="11"
          background
        ></el-pagination> -->

        <!-- 无数据提示 -->
        <!-- <p v-else>No data available.</p> -->
      </el-config-provider>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.title {
  margin-left: 2rem;
  font-size: 2.2rem;
  opacity: 0.8;
  color: #fff;
}
.current-title {
  color: #aee2ff;
  text-shadow: -1px 1px #fff;
}

.imp-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  // justify-content: center;
  // align-items: center;
  .current-table {
    margin: 1.5rem auto 1.5rem;
  }
  .chosemodel {
    display: flex;
    flex: 1;
    justify-content: flex-end;
  }
  .chosetable {
    margin: 1rem auto 1.5rem;
    .el-button {
      background-color: #4f709c;
      color: #fff;
    }
  }
}
::v-deep .el-select .el-input {
  display: flex;
  flex: 1;
  justify-content: flex-end;
}
::v-deep .el-table__body tr:hover > td {
  background: #6e85b7 !important;
}
::v-deep .el-table {
  background-color: transparent;
}
</style>
