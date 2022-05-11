import Rest from '@/services/rest'

export default class DescricaoService extends Rest {
  constructor (http) {
    super('/api/descricao', http)
  }
}
