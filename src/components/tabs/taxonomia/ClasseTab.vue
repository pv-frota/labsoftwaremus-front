<template>
    <q-table
      title="Classes"
      :rows="classes"
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
            label="Nova Classe"
            @click="showDialog()"
          >
            <q-tooltip>
              Adicionar nova classe
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
            @click="deleteClasse(props.row.id)"
          >
            <q-tooltip>
              Excluir
            </q-tooltip>
          </q-btn>
        </q-td>
      </template>
    </q-table>
    <classe-dialog 
      v-model="this.enableDialog" 
      :classe="classeSelecionado" 
      @close="closeDialog"
    />
</template>

<script>
import { columns } from '@/constantes/classe.const'
import ClasseDialog from '@/components/dialogs/taxonomia/ClasseDialog.vue'
export default {
  name: 'ClasseTab',
  components: {
    ClasseDialog
  },
  data () {
    return {
      classes: [],
      columns: columns,
      enableDialog: false,
      classeSelecionado: 0
    }
  },
  mounted () {
    this.getClasses()
  },
  methods: {
    async getClasses() {
      try {
        this.$q.loading.show()
        let response = await this.$services.classe().list()
        this.classes = response.data
      } catch (e) {
        console.log(e)
      } finally {
        this.$q.loading.hide()
      }
    },
    async deleteClasse(id) {
      try {
        this.$q.loading.show()
        await this.$services.classe().delete(id)
      } catch (e) {
        console.log(e)
      } finally {
        this.$q.loading.hide()
        this.getClasses()
      }
    },
    showDialog (id = 0) {
      this.classeSelecionado = id
      this.enableDialog = true
    },
    closeDialog () {
      this.classeSelecionado = 0
      this.enableDialog = false
      this.getClasses()
    }
  }
}
</script>
