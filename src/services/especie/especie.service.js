import Rest from '@/services/rest'

export default class EspecieService extends Rest {
  constructor (http) {
    super('/api/taxonomia/especie', http)
  }
}
