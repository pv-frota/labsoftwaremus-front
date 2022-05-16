import Rest from '@/services/rest'

export default class FiltroService extends Rest {
  constructor (http) {
    super('/api/pesquisa', http)
  }

  async buscaLivre (parametro, operacao, valor) {
    return await this.http.get(`${this.url}/busca/${parametro}/${operacao}/${valor}}`)
  }
}
