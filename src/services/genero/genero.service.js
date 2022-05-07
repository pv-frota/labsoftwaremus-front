import Rest from '@/services/rest'

export default class GeneroService extends Rest {
  constructor (http) {
    super('/api/taxonomia/genero', http)
  }
}
