import axios from 'axios'
import { useUserStore } from '@/stores'
import { ElMessage } from 'element-plus'
import router from '@/router'

// 需配置基地址 xxxx
// const baseURL = 'http://bydcly2x.shenzhuo.vip:30092'
// 工控机地址
// const baseURL = 'http://bydcly2x.shenzhuo.vip:47391'
// pc机地址
// const baseURL = 'http://bydcly2x.shenzhuo.vip:14656'
// const { protocol, host } = window.location
// const baseURL = `${protocol}//${host}/`
const baseURL = `http://127.0.0.1:8001`


const instance = axios.create({
  // TODO 1. 基础地址，超时时间
  baseURL,
  timeout: 45000
})

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    // TODO 2. 携带token
    const useStore = useUserStore()
    if (useStore.token) {
      config.headers.Authorization = `Token ${useStore.token}`
    }
    return config
  },
  (err) => Promise.reject(err)
)

// 响应拦截器
instance.interceptors.response.use(
  (res) => {
    // TODO 4. 摘取核心响应数据
    // 业务成功
    if (res.data.code === 0 || res.data.status === 0) {
      return res
    }
    // TODO 3. 处理业务失败
    // 处理业务失败，给错误提示，抛出错误
    ElMessage.error(res.data.message || '服务异常')
    return Promise.reject(res.data)
  },
  (err) => {
    // TODO 5. 处理401错误
    // 错误的特殊情况 => 401 权限不足 或 token 过期 =>拦截到登录
    if (err.response?.status === 401) {
      router.push('/login')
    }
    // 错误的默认情况 => 给提示
    ElMessage.error(err.response.data.message || '服务异常')
    return Promise.reject(err)
  }
)

export default instance
export { baseURL }
