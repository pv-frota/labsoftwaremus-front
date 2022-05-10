<template>
    <q-table
      title="Reinos"
      :rows="reinos"
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
            label="Novo Reino"
            @click="showDialog()"
          >
            <q-tooltip>
              Adicionar novo reino
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
            @click="deleteReino(props.row.id)"
          >
            <q-tooltip>
              Excluir
            </q-tooltip>
          </q-btn>
        </q-td>
      </template>
    </q-table>
    <reino-dialog 
      v-model="this.enableDialog" 
      :reino="reinoSelecionado" 
      @close="closeDialog"
    />
</template>

<script>
import { columns } from '@/constantes/reino.const'
import ReinoDialog from '@/components/dialogs/taxonomia/ReinoDialog.vue'
export default {
  name: 'ReinoTab',
  components: {
    ReinoDialog
  },
  data () {
    return {
      reinos: [],
      columns: columns,
      enableDialog: false,
      reinoSelecionado: 0
    }
  },
  mounted () {
    this.getReinos()
  },
  methods: {
    async getReinos() {
      try {
        this.$q.loading.show()
        let response = await this.$services.reino().list()
        this.reinos = response.data
      } catch (e) {
        console.log(e)
      } finally {
        this.$q.loading.hide()
      }
    },
    async deleteReino(id) {
      try {
        this.$q.loading.show()
        await this.$services.reino().delete(id)
      } catch (e) {
        console.log(e)
      } finally {
        this.$q.loading.hide()
        this.getReinos()
      }
    },
    showDialog (id = 0) {
      this.reinoSelecionado = id
      this.enableDialog = true
    },
    closeDialog () {
      this.reinoSelecionado = 0
      this.enableDialog = false
      this.getReinos()
    }
  }
}
</script>
