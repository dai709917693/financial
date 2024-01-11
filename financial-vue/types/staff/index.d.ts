import type { Project } from 'types/project'

export interface StaffProject {
  staffId?: string
  projectId?: string
  project?: Project
  staff?: Staff
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
