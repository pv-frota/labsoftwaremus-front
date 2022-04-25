import { http } from './axios'

import AuthService from './auth/auth.service'
import ClassificacaoService from './classificacao/classificacao.service'

export default {
  auth: () => new AuthService(http),
  classificacao: () => new ClassificacaoService(http)
}
