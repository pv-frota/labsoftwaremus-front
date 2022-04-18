import { http } from './axios'

import AuthService from './auth/auth.service'

export default {
  auth: () => new AuthService(http)
}
