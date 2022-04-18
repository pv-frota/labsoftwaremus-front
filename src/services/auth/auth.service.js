import Rest from '@/services/rest'

export default class AuthService extends Rest {
  constructor (http) {
    super('/auth', http)
  }

  async login($login, $senha) {
    return await this.http.post(`${this.url}/login`, {login: $login, senha: $senha})
  }
}
