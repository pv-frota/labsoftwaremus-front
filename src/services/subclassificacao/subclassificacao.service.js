import Rest from '@/services/rest'

export default class SubclassificacaoService extends Rest {
  constructor (http) {
    super('/api/subclassificacao', http)
  }
}
