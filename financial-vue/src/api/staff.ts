import { instance } from './base'
import type { CommonApiRes, CommonList, Staff, StaffProject } from '#types'

interface ListParams {
  name?: string
  projectId?: string
  pageNum: number
  pageSize: number
}

interface CreateParams {
  name: string
  projects?: StaffProject[]
}

export const apiStaff = {
  async list(params: ListParams) {
    const res = await instance.get<any, CommonApiRes<CommonList<Staff>>>('v1/staff', { params })
    return res
  },
  async allList() {
    const res = await instance.get<any, CommonApiRes<Staff[]>>('v1/staff/all')
    return res
  },
  async create(params: CreateParams) {
    const res = await instance.post<any, CommonApiRes<any>>('v1/staff', params)
    return res
  },
  async update(params: CreateParams & { id: string }) {
    const res = await instance.put<any, CommonApiRes<any>>('v1/staff', params)
    return res
  },
  async remove(id: string) {
    const res = await instance.delete<any, CommonApiRes<any>>('v1/staff/' + id)
    return res
  }
}
