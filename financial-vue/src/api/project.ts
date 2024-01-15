import { instance } from './base'
import type { CommonApiRes, CommonList, Project, StaffProject } from '#types'

interface ListParams {
  name?: string
  hasStaff?: boolean
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
  async allList(hasStaff?: boolean) {
    const res = await instance.get<any, CommonApiRes<Project[]>>('v1/project/all', {
      params: {
        hasStaff
      }
    })
    return res
  },
  async create(params: CreateParams) {
    const res = await instance.post<any, CommonApiRes<any>>('v1/project', params)
    return res
  },
  async update(params: CreateParams & { id: string }) {
    const res = await instance.put<any, CommonApiRes<any>>('v1/project', params)
    return res
  },
  async remove(id: string) {
    const res = await instance.delete<any, CommonApiRes<any>>('v1/project/' + id)
    return res
  }
}
