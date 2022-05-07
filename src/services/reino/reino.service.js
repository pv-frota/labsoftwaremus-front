import Rest from '@/services/rest'

export default class ReinoService extends Rest {
  constructor (http) {
    super('/api/taxonomia/reino', http)
  }
}
