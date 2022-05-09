<template>
    <q-table
      title="Ordems"
      :rows="ordems"
      :columns="columns"
      row-key="id"
    >
      <template v-slot:top-right>
        <q-btn
            size="sm"
            dense
            color="green"
            icon="fas fa-plus"
            class="q-pa-xs"
            label="Nova Ordem"
            @click="showDialog()"
          >
            <q-tooltip>
              Adicionar nova ordem
            </q-tooltip>
          </q-btn>
      </template>
      <template v-slot:body-cell-acoes="props">
        <q-td :props="props">
          <q-btn
            size="sm"
            color="info"
            dense
            icon="fas fa-edit"
            class="q-pa-xs"
            @click="showDialog(props.row.id)"
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
            @click="deleteOrdem(props.row.id)"
          >
            <q-tooltip>
              Excluir
            </q-tooltip>
          </q-btn>
        </q-td>
      </template>
    </q-table>
    <ordem-dialog 
      v-model="this.enableDialog" 
      :ordem="ordemSelecionado" 
      @close="closeDialog"
    />
</template>

<script>
import { columns } from '@/constantes/ordem.const'
import OrdemDialog from '@/components/taxonomia/OrdemDialog.vue'
export default {
  name: 'OrdemTab',
  components: {
    OrdemDialog
  },
  data () {
    return {
      ordems: [],
      columns: columns,
      enableDialog: false,
      ordemSelecionado: 0
    }
  },
  mounted () {
    this.getOrdems()
  },
  methods: {
    async getOrdems() {
      try {
        this.$q.loading.show()
        let response = await this.$services.ordem().list()
        this.ordems = response.data
      } catch (e) {
        console.log(e)
      } finally {
        this.$q.loading.hide()
      }
    },
    async deleteOrdem(id) {
      try {
        this.$q.loading.show()
        await this.$services.ordem().delete(id)
      } catch (e) {
        console.log(e)
      } finally {
        this.$q.loading.hide()
        this.getOrdems()
      }
    },
    showDialog (id = 0) {
      this.ordemSelecionado = id
      this.enableDialog = true
    },
    closeDialog () {
      this.ordemSelecionado = 0
      this.enableDialog = false
      this.getOrdems()
    }
  }
}
</script>
