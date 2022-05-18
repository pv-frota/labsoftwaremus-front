const columns = [
  { name: 'id', label: 'Código', field: 'id', align: 'left', sortable: true },
  { name: 'subclassificacao', label: 'Subclassificação', field: row => row.subclassificacao.nome, align: 'left', sortable: true },
  { name: 'nome', label: 'Nome', field: 'valor', align: 'left', sortable: true },
  { name: 'acoes', align: 'right', label: 'Ações', field: 'acoes', sortable: true }
]

const columnsParametro = [
  { name: 'classificacao', label: 'Classificação', field: row => row.subclassificacao.classificacao.nome, align: 'left', sortable: true },
  { name: 'subclassificacao', label: 'Subclassificação', field: row => row.subclassificacao.nome, align: 'left', sortable: true },
  { name: 'nome', label: 'Relação-Descrição', field: row => row.pai != null ? row.pai.valor : 'Nenhuma', align: 'left', sortable: true },
  { name: 'nome', label: 'Valor', field: 'valor', align: 'left', sortable: true }
]

export {
  columns,
  columnsParametro
}