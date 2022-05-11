<template>
    <q-table
      title="Descrições"
      :rows="descricaos"
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
            label="Nova Descrição"
            @click="showDialog()"
          >
            <q-tooltip>
              Adicionar nova descrição
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
            @click="deleteDescricao(props.row.id)"
          >
            <q-tooltip>
              Excluir
            </q-tooltip>
          </q-btn>
        </q-td>
      </template>
    </q-table>
    <descricao-dialog 
      v-model="this.enableDialog" 
      :descricao="descricaoSelecionado" 
      @close="closeDialog"
    />
</template>

<script>
import { columns } from '@/constantes/descricao.const'
import DescricaoDialog from '@/components/dialogs/especificacao/DescricaoDialog.vue'
export default {
  name: 'DescricaoTab',
  components: {
    DescricaoDialog
  },
  data () {
    return {
      descricaos: [],
      columns: columns,
      enableDialog: false,
      descricaoSelecionado: 0
    }
  },
  mounted () {
    this.getDescricaos()
  },
  methods: {
    async getDescricaos() {
      try {
        this.$q.loading.show()
        let response = await this.$services.descricao().list()
        this.descricaos = response.data
      } catch (e) {
        console.log(e)
      } finally {
        this.$q.loading.hide()
      }
    },
    async deleteDescricao(id) {
      try {
        this.$q.loading.show()
        await this.$services.descricao().delete(id)
      } catch (e) {
        console.log(e)
      } finally {
        this.$q.loading.hide()
        this.getDescricaos()
      }
    },
    showDialog (id = 0) {
      this.descricaoSelecionado = id
      this.enableDialog = true
    },
    closeDialog () {
      this.descricaoSelecionado = 0
      this.enableDialog = false
      this.getDescricaos()
    }
  }
}
</script>
