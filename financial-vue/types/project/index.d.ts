import type { StaffProject } from 'types/staff'

export interface Project {
  id: string
  name: string
  notes?: string
  staffProjects?: StaffProject[]
}
