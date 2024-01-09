import { instance, updateToken } from './base'
import type { CommonApiRes } from '#types'
export const apiAuth = {
  async login(username: string, password: string): Promise<CommonApiRes<string>> {
    const res = await instance.post('v1/auth/login', { username, password })
    updateToken(res.data)
    return res
  }
}
