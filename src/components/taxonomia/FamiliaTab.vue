<template>
    <q-table
      title="Famílias"
      :rows="familias"
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
            label="Nova Família"
            @click="showDialog()"
          >
            <q-tooltip>
              Adicionar nova família
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
            @click="deleteFamilia(props.row.id)"
          >
            <q-tooltip>
              Excluir
            </q-tooltip>
          </q-btn>
        </q-td>
      </template>
    </q-table>
    <familia-dialog 
      v-model="this.enableDialog" 
      :familia="familiaSelecionado" 
      @close="closeDialog"
    />
</template>

<script>
import { columns } from '@/constantes/familia.const'
import FamiliaDialog from '@/components/taxonomia/FamiliaDialog.vue'
export default {
  name: 'FamiliaTab',
  components: {
    FamiliaDialog
  },
  data () {
    return {
      familias: [],
      columns: columns,
      enableDialog: false,
      familiaSelecionado: 0
    }
  },
  mounted () {
    this.getFamilias()
  },
  methods: {
    async getFamilias() {
      try {
        this.$q.loading.show()
        let response = await this.$services.familia().list()
        this.familias = response.data
      } catch (e) {
        console.log(e)
      } finally {
        this.$q.loading.hide()
      }
    },
    async deleteFamilia(id) {
      try {
        this.$q.loading.show()
        await this.$services.familia().delete(id)
      } catch (e) {
        console.log(e)
      } finally {
        this.$q.loading.hide()
        this.getFamilias()
      }
    },
    showDialog (id = 0) {
      this.familiaSelecionado = id
      this.enableDialog = true
    },
    closeDialog () {
      this.familiaSelecionado = 0
      this.enableDialog = false
      this.getFamilias()
    }
  }
}
</script>
