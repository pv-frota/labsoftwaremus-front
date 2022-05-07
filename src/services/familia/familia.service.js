import Rest from '@/services/rest'

export default class FamiliaService extends Rest {
  constructor (http) {
    super('/api/taxonomia/familia', http)
  }
}
