import Rest from '@/services/rest'

export default class FiloService extends Rest {
  constructor (http) {
    super('/api/taxonomia/filo', http)
  }
}
