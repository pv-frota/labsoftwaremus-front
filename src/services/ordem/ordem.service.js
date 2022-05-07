import Rest from '@/services/rest'

export default class OrdemService extends Rest {
  constructor (http) {
    super('/api/taxonomia/ordem', http)
  }
}
