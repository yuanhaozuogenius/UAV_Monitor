<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { UserFilled, SwitchButton } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores'
import { useRouter } from 'vue-router'
const userStore = useUserStore()
const router = useRouter()

const time = ref()
// 获取当前时间
const getTime = () => {
  const date = new Date()
  let h = date.getHours()
  let m = date.getMinutes()
  let s = date.getSeconds()
  h = h < 10 ? '0' + h : h
  m = m < 10 ? '0' + m : m
  s = s < 10 ? '0' + s : s
  time.value =
    date.getFullYear() +
    '-' +
    (date.getMonth() + 1) +
    '-' +
    date.getDate() +
    ' ' +
    h +
    ':' +
    m +
    ':' +
    s +
    ''
  // console.log(time.value)
}
var timer = 0
onMounted(() => {
  timer = setInterval(() => {
    //设置定时器
    getTime() //自定义事件
  }, 1000)
})
onBeforeUnmount(() => {
  clearInterval(timer) //清除定时器
  timer = 0
})

onMounted(() => {
  userStore.getUser()
})
const logout = async () => {
  // 退出操作
  // 清楚本地的数据（token+user信息）
  await ElMessageBox.confirm('你确认要进行退出吗？', '温馨提示', {
    type: 'warning',
    confirmButtonText: '确认',
    cancelButtonText: '取消'
  })
  userStore.removeToken()
  userStore.setUser({})
  router.push('/login')
}
</script>
<template>
  <div class="common-layout">
    <div class="container">
      <div class="header">
        <h1>无人机故障监测系统</h1>
        <div class="showTime">
          <span>{{ time }}</span>
        </div>
        <div class="info">
          <!-- <span>
            <el-icon><UserFilled /></el-icon>用户名：{{
              userStore.user.username
            }}
          </span> -->
          <el-button @click="logout"
            ><el-icon><UserFilled /></el-icon>
            <span>用户名：{{ userStore.user.username }}</span></el-button
          >
          <el-button @click="logout"
            ><el-icon><SwitchButton /></el-icon>
            <span>退出登录</span></el-button
          >
        </div>
      </div>
      <div class="main"><router-view></router-view></div>
      <div class="footer">
        <!--
          active-text-color 设置高亮文字颜色 409EFF
          :default-active="$route.path" 配置默认高亮的菜单项
          router el-menu-item 的index就是点击跳转的路径
          -->
        <el-menu
          background-color="06164a"
          text-color="#02a6b5"
          active-text-color="#fff"
          :default-active="$route.path"
          class="el-menu"
          mode="horizontal"
          router
        >
          <el-menu-item class="menu-item" index="/monitoring"
            >系统状态</el-menu-item
          >
          <!-- <el-sub-menu index="2">
            <template #title>Workspace</template>
            <el-menu-item index="2-1">item one</el-menu-item>
            <el-menu-item index="2-2">item two</el-menu-item>
            <el-menu-item index="2-3">item three</el-menu-item>
            <el-sub-menu index="2-4">
              <template #title>item four</template>
              <el-menu-item index="2-4-1">item one</el-menu-item>
              <el-menu-item index="2-4-2">item two</el-menu-item>
              <el-menu-item index="2-4-3">item three</el-menu-item>
            </el-sub-menu>
          </el-sub-menu> -->
          <el-menu-item class="menu-item" index="/datashow"
            >数据统计</el-menu-item
          >
          <el-menu-item class="menu-item" index="/update"
            >数据查询</el-menu-item
          >
<!--          <el-menu-item class="menu-item" index="/implement"-->
<!--            >模型应用</el-menu-item-->
<!--          >-->
        </el-menu>
      </div>
    </div>

    <!-- <el-container>
      <el-header>Header</el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
      <el-footer class="footer">
       
      </el-footer>
    </el-container> -->
  </div>
</template>

<style lang="scss" scoped>
.container {
  margin: 0;
  padding: 0;
  height: 100vh;
  width: 100vw;
  font-family: Arial, Helvetica, sans-serif;
  background-repeat: no-repeat;
  background-color: #06164a;
  background-size: cover;
  .header {
    font-size: 5rem;
    margin: 0 auto;
    position: relative;
    width: 100%;
    height: 5rem;
    background: url('@/assets/headBg.png') no-repeat top center;
    background-size: 100% 100%;
    h1 {
      line-height: 5rem;
      height: 5rem;
      font-size: 2.375rem;
      color: #81e7ed;
      text-align: center;
    }
    .showTime {
      position: absolute;
      top: 0;
      left: 1.875rem;
      line-height: 4.6875rem;
      height: 1.25rem;
      font-size: 1.25rem;
      color: #81e7ed;
      font-weight: 600;
    }
    .info {
      position: absolute;
      top: 0;
      right: 1.875rem;
      line-height: 4.6875rem;
      height: 1.25rem;
      font-size: 1.25rem;
      font-weight: 600;
      color: #81e7ed;
    }
    .el-button {
      background: transparent;
      line-height: 4.6875rem;
      height: 1.25rem;
      font-size: 1.25rem;
      font-weight: 600;
      color: #81e7ed;
      border: none;
    }
  }

  .main {
    height: calc(100vh - 200px);
    // width: 100%;
    // height: calc(100% - 20rem);
    // padding: 0.125rem;
    // display: flex;
  }
  .footer {
    position: absolute;
    bottom: 0;
    .el-menu {
      font-family: Arial, Helvetica, sans-serif;
      padding: 0;
      height: 100%;
      width: 100vw;
      display: flex;
      justify-content: space-between;
      .menu-item {
        font-size: 1.2rem;
        padding: 0;
        margin: 0;
        width: 24vw;
        border: 2px solid rgba(25, 186, 139, 0.17);
        border-radius: 5px;
        font-weight: 300;
        box-sizing: border-box;
      }
      .menu-item::before {
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
      .menu-item::after {
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
    }
  }
}
::v-deep .el-menu .el-menu-item {
  min-width: auto !important;
}
</style>
