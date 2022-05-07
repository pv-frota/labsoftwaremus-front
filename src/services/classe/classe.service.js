import Rest from '@/services/rest'

export default class ClasseService extends Rest {
  constructor (http) {
    super('/api/taxonomia/classe', http)
  }
}
