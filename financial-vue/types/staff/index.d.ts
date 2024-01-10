export interface StaffProject {
  staffId?: string
  projectId?: string
  // 出勤单价
  attendanceUnitPrice: number
  // 加班单价
  overtimeUnitPrice: number
}

export interface Staff {
  id: string
  name: string
  staffProjects?: StaffProject[]
}
