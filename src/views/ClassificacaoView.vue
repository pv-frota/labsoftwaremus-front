<template>
  <div class="row justify-evenly">
    <q-table
      title="Classificações"
      :rows="classificacoes"
      :columns="columns"
      row-key="id"
      class="col-4"
    >
      <template v-slot:body-cell-acoes="props">
        <q-td :props="props">
          <q-btn
            size="sm"
            color="info"
            dense
            icon="fas fa-edit"
            class="q-pa-xs"
          >
            <q-tooltip>
              Editar
            </q-tooltip>
          </q-btn>
          <q-btn
            size="sm"
            color="negative"
            dense
            icon="fas fa-trash"
            class="q-pa-xs q-ml-xs"
          >
            <q-tooltip>
              Excluir
            </q-tooltip>
          </q-btn>
        </q-td>
      </template>
    </q-table>
    <q-table
      title="Classificações"
      :rows="classificacoes"
      :columns="columns"
      row-key="id"
      class="col-4"
    >
      <template v-slot:body-cell-acoes="props">
        <q-td :props="props">
          <q-btn
            size="sm"
            color="info"
            dense
            icon="fas fa-edit"
            class="q-pa-xs"
          >
            <q-tooltip>
              Editar
            </q-tooltip>
          </q-btn>
          <q-btn
            size="sm"
            color="negative"
            dense
            icon="fas fa-trash"
            class="q-pa-xs q-ml-xs"
          >
            <q-tooltip>
              Excluir
            </q-tooltip>
          </q-btn>
        </q-td>
      </template>
    </q-table>
  </div>
</template>


<script>
import { columns } from '../constantes/classificacao.const'
export default {
  name: 'ClassificacaoView',
  data () {
    return {
      classificacoes: [],
      columns: columns
    }
  },
  async mounted () {
    try {
      this.$q.loading.show()
      let response = await this.$services.classificacao().list()
      this.classificacoes = response.data
    } catch (e) {
      console.log(e)
    } finally {
      this.$q.loading.hide()
    }
  }
}
</script>
