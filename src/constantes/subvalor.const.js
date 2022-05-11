const columns = [
  { name: 'id', label: 'Código', field: 'id', align: 'left', sortable: true },
  { name: 'subclassificacao', label: 'Subclassificação', field: row => row.subclassificacao.nome, align: 'left', sortable: true },
  { name: 'descricao', label: 'Descrição', field: row => row.pai.valor, align: 'left', sortable: true },
  { name: 'nome', label: 'Nome', field: 'valor', align: 'left', sortable: true },
  { name: 'nome', label: 'Informação Extra', field: 'subvalor', align: 'left', sortable: true },
  { name: 'acoes', align: 'right', label: 'Ações', field: 'acoes', sortable: true }
]

export {
  columns
}