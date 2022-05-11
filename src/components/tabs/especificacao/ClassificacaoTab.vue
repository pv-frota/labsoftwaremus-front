<template>
    <q-table
      title="Classificações"
      :rows="classificacaos"
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
            label="Nova Classificação"
            @click="showDialog()"
          >
            <q-tooltip>
              Adicionar nova classificação
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
            @click="deleteClassificacao(props.row.id)"
          >
            <q-tooltip>
              Excluir
            </q-tooltip>
          </q-btn>
        </q-td>
      </template>
    </q-table>
    <classificacao-dialog 
      v-model="this.enableDialog" 
      :classificacao="classificacaoSelecionado" 
      @close="closeDialog"
    />
</template>

<script>
import { columns } from '@/constantes/classificacao.const'
import ClassificacaoDialog from '@/components/dialogs/especificacao/ClassificacaoDialog.vue'
export default {
  name: 'ClassificacaoTab',
  components: {
    ClassificacaoDialog
  },
  data () {
    return {
      classificacaos: [],
      columns: columns,
      enableDialog: false,
      classificacaoSelecionado: 0
    }
  },
  mounted () {
    this.getClassificacaos()
  },
  methods: {
    async getClassificacaos() {
      try {
        this.$q.loading.show()
        let response = await this.$services.classificacao().list()
        this.classificacaos = response.data
      } catch (e) {
        console.log(e)
      } finally {
        this.$q.loading.hide()
      }
    },
    async deleteClassificacao(id) {
      try {
        this.$q.loading.show()
        await this.$services.classificacao().delete(id)
      } catch (e) {
        console.log(e)
      } finally {
        this.$q.loading.hide()
        this.getClassificacaos()
      }
    },
    showDialog (id = 0) {
      this.classificacaoSelecionado = id
      this.enableDialog = true
    },
    closeDialog () {
      this.classificacaoSelecionado = 0
      this.enableDialog = false
      this.getClassificacaos()
    }
  }
}
</script>
