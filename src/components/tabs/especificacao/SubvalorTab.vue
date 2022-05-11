<template>
    <q-table
      title="Subvalor"
      :rows="subvalors"
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
            label="Novo Subvalor"
            @click="showDialog()"
          >
            <q-tooltip>
              Adicionar novo subvalor
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
            @click="deleteSubvalor(props.row.id)"
          >
            <q-tooltip>
              Excluir
            </q-tooltip>
          </q-btn>
        </q-td>
      </template>
    </q-table>
    <subvalor-dialog 
      v-model="this.enableDialog" 
      :subvalor="subvalorSelecionado" 
      @close="closeDialog"
    />
</template>

<script>
import { columns } from '@/constantes/subvalor.const'
import SubvalorDialog from '@/components/dialogs/especificacao/SubvalorDialog.vue'
export default {
  name: 'SubvalorTab',
  components: {
    SubvalorDialog
  },
  data () {
    return {
      subvalors: [],
      columns: columns,
      enableDialog: false,
      subvalorSelecionado: 0
    }
  },
  mounted () {
    this.getSubvalors()
  },
  methods: {
    async getSubvalors() {
      try {
        this.$q.loading.show()
        let response = await this.$services.subvalor().list()
        this.subvalors = response.data
      } catch (e) {
        console.log(e)
      } finally {
        this.$q.loading.hide()
      }
    },
    async deleteSubvalor(id) {
      try {
        this.$q.loading.show()
        await this.$services.subvalor().delete(id)
      } catch (e) {
        console.log(e)
      } finally {
        this.$q.loading.hide()
        this.getSubvalors()
      }
    },
    showDialog (id = 0) {
      this.subvalorSelecionado = id
      this.enableDialog = true
    },
    closeDialog () {
      this.subvalorSelecionado = 0
      this.enableDialog = false
      this.getSubvalors()
    }
  }
}
</script>
