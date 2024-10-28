<script setup>
import { ref } from 'vue'
import { sysGetFaultService } from '@/api/system'
const loading = ref(false)
const faultList = ref([])
const getFaultList = async () => {
  loading.value = true
  const res = await sysGetFaultService()
  loading.value = false
  faultList.value = res.data.data
}
getFaultList()
// const tableData = ref([
//   {
//     time: '11月29日',
//     name: '开调节阀',
//     info: '阀门无法开启'
//     // advice: '开调节阀'
//   },
//   {
//     time: '11月28日',
//     name: '开调节阀',
//     info: '阀门无法开启'
//     // advice: '开调节阀'
//   },
//   {
//     time: '11月27日',
//     name: '开调节阀',
//     info: '阀门无法开启'
//     // advice: '开调节阀'
//   }
// ])
</script>

<template>
  <el-table
    max-height="13vh"
    v-loading="loading"
    element-loading-text="加载中..."
    element-loading-background="#06164a"
    :data="faultList"
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
  >
    <el-table-column prop="time" label="时间" />
    <el-table-column prop="name" label="工况名称" />
    <el-table-column prop="info" label="诊断信息" />
    <!-- <el-table-column prop="advice" label="优化建议" /> -->
    <template #empty>
      <el-empty
        description="没有数据"
        style="background-color: #06164a; height: 21vh"
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
