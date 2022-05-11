import Rest from '@/services/rest'

export default class SubvalorService extends Rest {
  constructor (http) {
    super('/api/descricao/subvalor', http)
  }
}
