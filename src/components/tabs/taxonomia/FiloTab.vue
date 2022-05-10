<template>
    <q-table
      title="Filos"
      :rows="filos"
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
            label="Novo Filo"
            @click="showDialog()"
          >
            <q-tooltip>
              Adicionar novo filo
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
            @click="deleteFilo(props.row.id)"
          >
            <q-tooltip>
              Excluir
            </q-tooltip>
          </q-btn>
        </q-td>
      </template>
    </q-table>
    <filo-dialog 
      v-model="this.enableDialog" 
      :filo="filoSelecionado" 
      @close="closeDialog"
    />
</template>

<script>
import { columns } from '@/constantes/filo.const'
import FiloDialog from '@/components/dialogs/taxonomia/FiloDialog.vue'
export default {
  name: 'FiloTab',
  components: {
    FiloDialog
  },
  data () {
    return {
      filos: [],
      columns: columns,
      enableDialog: false,
      filoSelecionado: 0
    }
  },
  mounted () {
    this.getFilos()
  },
  methods: {
    async getFilos() {
      try {
        this.$q.loading.show()
        let response = await this.$services.filo().list()
        this.filos = response.data
      } catch (e) {
        console.log(e)
      } finally {
        this.$q.loading.hide()
      }
    },
    async deleteFilo(id) {
      try {
        this.$q.loading.show()
        await this.$services.filo().delete(id)
      } catch (e) {
        console.log(e)
      } finally {
        this.$q.loading.hide()
        this.getFilos()
      }
    },
    showDialog (id = 0) {
      this.filoSelecionado = id
      this.enableDialog = true
    },
    closeDialog () {
      this.filoSelecionado = 0
      this.enableDialog = false
      this.getFilos()
    }
  }
}
</script>
