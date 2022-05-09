const columns = [
  { name: 'id', label: 'Código', field: 'id', align: 'left', sortable: true },
  { name: 'nome', label: 'Nome', field: 'nome', align: 'left', sortable: true },
  { name: 'familia', label: 'Família', field: row => row.familia.nome, align: 'left', sortable: true },
  { name: 'acoes', align: 'right', label: 'Ações', field: 'acoes', sortable: true }
]

export {
  columns
}