import { http } from './axios'

import AuthService from './auth/auth.service'
import ClassificacaoService from './classificacao/classificacao.service'
import SubclassificacaoService from './subclassificacao/subclassificacao.service'
import DescricaoService from './descricao/descricao.service'
import SubvalorService from './subvalor/subvalor.service'
import ReinoService from './reino/reino.service'
import FiloService from './filo/filo.service'
import ClasseService from './classe/classe.service'
import OrdemService from './ordem/ordem.service'
import FamiliaService from './familia/familia.service'
import GeneroService from './genero/genero.service'
import EspecieService from './especie/especie.service'

export default {
  auth: () => new AuthService(http),
  classificacao: () => new ClassificacaoService(http),
  subclassificacao: () => new SubclassificacaoService(http),
  descricao: () => new DescricaoService(http),
  subvalor: () => new SubvalorService(http),
  reino: () => new ReinoService(http),
  filo: () => new FiloService(http),
  classe: () => new ClasseService(http),
  ordem: () => new OrdemService(http),
  familia: () => new FamiliaService(http),
  genero: () => new GeneroService(http),
  especie: () => new EspecieService(http)
}
