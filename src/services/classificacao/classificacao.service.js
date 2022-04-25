import Rest from '@/services/rest'

export default class ClassificacaoService extends Rest {
  constructor (http) {
    super('/api/classificacao', http)
  }
}
