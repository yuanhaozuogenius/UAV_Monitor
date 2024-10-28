import request from '@/utils/request'

// 获取系统设备数量 需要填写地址 包括设备总数、正常设备数、故障设备数
export const sysGetNumberService = () =>
  request.get('deh/equip_manage/query_devices_count')

// 获取系统健康度曲线 需要填写地址 包括健康度
export const sysGetHealthService = () =>
  request.get('deh/equip_manage/query_health_curve')

// 获取系统运行状态 需填写地址
export const sysGetStatusService = () =>
  request.get('deh/equip_manage/query_devices_status')

// 获取系统故障信息 需填写地址
export const sysGetFaultService = () =>
  request.get('deh/equip_manage/query_devices_faulty')

// 获取系统故障发生概率
export const sysGetFaultProbabilityService = () =>
  request.get('deh/equip_manage/query_failure_probability')

// 获取系统故障处理率 需要填写地址 包括故障率和故障处理率
export const sysGetFaultRateService = () =>
  request.get('deh/equip_manage/query_handle_rate')

// 获取坐标点(x,y)关于时间t的列表
export const sysGetPhysicalListService = () =>
  request.get('deh/tables/get_physical_list')

// 获取系统实时曲线
export const sysGetRealTimeService = (params) =>
  request.get('deh/tables/get_realtime_curve', { params })

// 获取系统3d曲线
export const sysGet3dCurveService = (params) =>
  request.get('deh/tables/get_3d_curve', { params })

// 获取系统工况列表
export const sysGetWorkListService = () =>
  request.get('deh/equip_manage/query_working_condition')
