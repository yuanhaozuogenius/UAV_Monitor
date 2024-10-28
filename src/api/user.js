import request from '@/utils/request'

// 注册接口 需填写后端接口地址xxx
export const userRegisterService = ({ username, password, repassword }) =>
  request.post('deh/user/user', { username, password, repassword })

// 登录接口 需填写后端接口地址xxx
export const userLoginService = ({ username, password }) =>
  request.post('deh/user/login', { username, password })

//获取用户基本信息 需填写后端接口地址xxx
export const userGetInfoService = () => request.get('/deh/user/user_info')
