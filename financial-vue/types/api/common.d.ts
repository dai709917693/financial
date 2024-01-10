export interface CommonApiRes<R = any> {
  state: boolean
  code?: number
  data?: R
  message?: string
}

export interface CommonList<T = any> {
  list: T[]
  total: number
}
