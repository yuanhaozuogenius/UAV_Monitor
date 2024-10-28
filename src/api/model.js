// 算法模型相关的列表
import request from '@/utils/request'

// 获取算法所有分类 需要填写后端接口地址
export const modelGetOptionsService = () =>
  request.get('deh/diagnosis/get_algo_class')

// 获取算法列表 需要填写后端接口地址
export const modelGetListService = (params) =>
  request.get('deh/diagnosis/get_algo_list', { params })

// 提交训练算法的参数 需要填写后端接口地址
export const modelSubmitService = (trainParams) =>
  request.post('deh/diagnosis/train', trainParams)

// 获取当前应用的算法模型
export const modelGetCurrentService = () =>
  request.get('deh/diagnosis/get_current_model')

// 激活历史模型 需要填写后端接口地址
export const modelActivateService = (params) =>
  request.post('deh/diagnosis/apply_history_model', { params })
