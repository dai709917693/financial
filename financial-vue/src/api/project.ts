import { instance } from './base'
import type { CommonApiRes, CommonList, Project, StaffProject } from '#types'

interface ListParams {
  name?: string
  pageNum: number
  pageSize: number
}

interface CreateParams {
  name: string
  notes?: string
  staffs?: StaffProject[]
}

export const apiProject = {
  async list(params: ListParams) {
    const res = await instance.get<any, CommonApiRes<CommonList<Project>>>('v1/project', { params })
    return res
  },
  async allList() {
    const res = await instance.get<any, CommonApiRes<Project[]>>('v1/project/all')
    return res
  },
  async create(params: CreateParams) {
    const res = await instance.post<any, CommonApiRes<any>>('v1/project', params)
    return res
  },
  async update(params: CreateParams & { id: string }) {
    const res = await instance.put<any, CommonApiRes<any>>('v1/project', params)
    return res
  }
}
