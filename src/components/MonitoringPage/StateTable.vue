<script setup>
import { ref } from 'vue'
import { sysGetStatusService } from '@/api/system'
const loading = ref(false)
// 获取系统运行状态
const stateList = ref([])
const getStateList = async () => {
  loading.value = true
  console.log(1)
  const res = await sysGetStatusService()
  console.log(1, res)
  stateList.value = res.data.data
  loading.value = false
}
getStateList()
// const tableData = ref([
//   {
//     id: '6731c541',
//     name: '开调节阀',
//     state: '正常'
//   },
//   {
//     id: '6731c542',
//     name: '开调节阀',
//     state: '正常'
//   },
//   {
//     id: '6731c544',
//     name: '开主气阀',
//     state: '故障'
//   },
//   {
//     id: '6731c547',
//     name: '开主气阀',
//     state: '正常'
//   },
//   {
//     id: '6731c546',
//     name: '开主气阀',
//     state: '正常'
//   }
// ])
</script>

<template>
  <el-table
    max-height="21vh"
    highlight-current-row
    :data="stateList"
    style="width: 100%; background-color: #06164a"
    class="table"
    :cell-style="{ 'text-align': 'center' }"
    :row-style="{ background: '#06164a', color: '#fff' }"
    :header-cell-style="{
      'text-align': 'center',
      'font-size': '18px',
      background: '#06164a !important',
      color: '#fff'
    }"
    v-loading="loading"
    element-loading-text="加载中..."
    element-loading-background="#06164a"
  >
    <el-table-column prop="id" label="编号" width="150" />
    <el-table-column prop="name" label="工况名称" width="150" />
    <el-table-column prop="state" label="状态" />
    <template #empty>
      <el-empty
        description="没有数据"
        style="height: 21vh; background-color: #06164a"
      ></el-empty>
    </template>
  </el-table>
</template>

<style lang="scss" scoped>
::v-deep .el-table__body tr:hover > td {
  background: #063570 !important;
}
::v-deep .el-table {
  background-color: transparent;
}
::v-deep .empty-container {
  height: 21vh; /* 自定义高度 */
}
</style>
