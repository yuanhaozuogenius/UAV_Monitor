import request from '@/utils/request'
// 获取训练数据列表 需要填写接口地址
export const dataGetListService = (params) =>
  request.get('deh/data/query_label', { params })
// 编辑训练数据 需要填写接口地址
export const dataEditService = (data) => request.post('', { data })
