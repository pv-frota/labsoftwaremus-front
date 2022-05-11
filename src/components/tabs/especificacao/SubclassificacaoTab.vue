<template>
    <q-table
      title="Subclassificações"
      :rows="subclassificacaos"
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
            label="Nova Subclassificação"
            @click="showDialog()"
          >
            <q-tooltip>
              Adicionar nova subclassificação
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
            @click="deleteSubclassificacao(props.row.id)"
          >
            <q-tooltip>
              Excluir
            </q-tooltip>
          </q-btn>
        </q-td>
      </template>
    </q-table>
    <subclassificacao-dialog 
      v-model="this.enableDialog" 
      :subclassificacao="subclassificacaoSelecionado" 
      @close="closeDialog"
    />
</template>

<script>
import { columns } from '@/constantes/subclassificacao.const'
import SubclassificacaoDialog from '@/components/dialogs/especificacao/SubclassificacaoDialog.vue'
export default {
  name: 'SubclassificacaoTab',
  components: {
    SubclassificacaoDialog
  },
  data () {
    return {
      subclassificacaos: [],
      columns: columns,
      enableDialog: false,
      subclassificacaoSelecionado: 0
    }
  },
  mounted () {
    this.getSubclassificacaos()
  },
  methods: {
    async getSubclassificacaos() {
      try {
        this.$q.loading.show()
        let response = await this.$services.subclassificacao().list()
        this.subclassificacaos = response.data
      } catch (e) {
        console.log(e)
      } finally {
        this.$q.loading.hide()
      }
    },
    async deleteSubclassificacao(id) {
      try {
        this.$q.loading.show()
        await this.$services.subclassificacao().delete(id)
      } catch (e) {
        console.log(e)
      } finally {
        this.$q.loading.hide()
        this.getSubclassificacaos()
      }
    },
    showDialog (id = 0) {
      this.subclassificacaoSelecionado = id
      this.enableDialog = true
    },
    closeDialog () {
      this.subclassificacaoSelecionado = 0
      this.enableDialog = false
      this.getSubclassificacaos()
    }
  }
}
</script>
