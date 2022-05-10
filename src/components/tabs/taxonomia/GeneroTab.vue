<template>
    <q-table
      title="Gêneros"
      :rows="generos"
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
            label="Novo Gênero"
            @click="showDialog()"
          >
            <q-tooltip>
              Adicionar novo gênero
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
            @click="deleteGenero(props.row.id)"
          >
            <q-tooltip>
              Excluir
            </q-tooltip>
          </q-btn>
        </q-td>
      </template>
    </q-table>
    <genero-dialog 
      v-model="this.enableDialog" 
      :genero="generoSelecionado" 
      @close="closeDialog"
    />
</template>

<script>
import { columns } from '@/constantes/genero.const'
import GeneroDialog from '@/components/dialogs/taxonomia/GeneroDialog.vue'
export default {
  name: 'GeneroTab',
  components: {
    GeneroDialog
  },
  data () {
    return {
      generos: [],
      columns: columns,
      enableDialog: false,
      generoSelecionado: 0
    }
  },
  mounted () {
    this.getGeneros()
  },
  methods: {
    async getGeneros() {
      try {
        this.$q.loading.show()
        let response = await this.$services.genero().list()
        this.generos = response.data
      } catch (e) {
        console.log(e)
      } finally {
        this.$q.loading.hide()
      }
    },
    async deleteGenero(id) {
      try {
        this.$q.loading.show()
        await this.$services.genero().delete(id)
      } catch (e) {
        console.log(e)
      } finally {
        this.$q.loading.hide()
        this.getGeneros()
      }
    },
    showDialog (id = 0) {
      this.generoSelecionado = id
      this.enableDialog = true
    },
    closeDialog () {
      this.generoSelecionado = 0
      this.enableDialog = false
      this.getGeneros()
    }
  }
}
</script>
