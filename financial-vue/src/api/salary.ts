import { instance } from './base'
import type { CommonApiRes, Staff, Project } from '#types'
export interface SalaryData {
  time: string
  data: Record<
    string,
    {
      attendance?: number
      overtime?: number
      attendanceSalary?: number
      overtimeSalary?: number
      totalSalary?: number
      paidSalary?: number
      reserveSalary?: number
    }
  >
}

interface SalaryRes {
  rows: (Staff | Project)[]
  salaryData: SalaryData[]
}

export const apiSalary = {
  async findOne(params: { projectId?: string; staffId?: string; time?: string }) {
    const res = await instance.get<any, CommonApiRes<SalaryRes>>('v1/salary', {
      params
    })
    return res
  }
}
