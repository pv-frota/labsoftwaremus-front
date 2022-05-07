import Rest from '@/services/rest'

export default class PesquisaService extends Rest {
  constructor (http) {
    super('/api/pesquisa', http)
  }
  // pra chamar o filtro só fazer .filter

  async buscaLivre(parametro, operacao, valor) {
    return await this.http.get(`${this.url}/busca/${parametro}/${operacao}/${valor}`)
  }
}
