import { instance } from './base'
import type { CommonApiRes, Staff } from '#types'
export interface CheckData {
  time: string
  data: Record<string, { attendance?: number; overtime?: number }>
}

interface UpdateParams {
  projectId: string
  checkData: CheckData[]
}

interface CheckRes {
  staffs: Staff[]
  checkData: CheckData[]
}

export const apiCheck = {
  async update(params: UpdateParams) {
    const res = await instance.put<any, CommonApiRes<any>>('v1/check', params)
    return res
  },
  async findOne(projectId: string) {
    const res = await instance.get<any, CommonApiRes<CheckRes>>('v1/check/' + projectId)
    return res
  }
}
