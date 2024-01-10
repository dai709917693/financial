import { instance, updateToken } from './base'
import type { CommonApiRes } from '#types'
export const apiAuth = {
  async login(username: string, password: string) {
    const res = await instance.post<any, CommonApiRes<string>>('v1/auth/login', {
      username,
      password
    })
    updateToken(res.data!)
    return res
  }
}
