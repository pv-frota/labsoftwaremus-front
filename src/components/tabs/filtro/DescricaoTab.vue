<template>
  <div class="column items-stretch">
    <q-form @submit="filtrar">
      <div class="bg-light-green-1">

        <p class="q-pa-md">Busca por Descrição</p>

        <div class="column justify-center">
          <select-autocomplete class="q-mb-md q-mx-xl"
            v-model="form.classificacao" 
            :values="classificacoes"
            label="Classificação"
            attribute="nome"
            @select="getSubclassificacoes"
          />

          <select-autocomplete class="q-mb-md q-mx-xl"
            v-model="form.subclassificacao" 
            :values="subclassificacoes"
            :disable="subclassificacoes.length == 0"
            label="Subclassificação"
            attribute="nome"
            @select="getDescricoes"
          />

          <select-autocomplete class="q-mb-md q-mx-xl"
            v-model="form.descricao" 
            :values="descricoes"
            :disable="descricoes.length == 0"
            label="Descrição"
            attribute="valor"
          />
        </div>

        <div class="row justify-end">
          <q-btn class="q-ma-md" 
            label="Adicionar Parâmetro" 
            color="positive" 
            @click="adicionarParametro"
          />
        </div>

        <q-table class="q-ma-md"
          title="Parâmetros da busca (Opcional)"
          dense
          :rows="form.parametros"
          :columns="columns"
          row-key="id"
        />

        <div class="row justify-end">
          <q-btn class="q-ma-md" label="Buscar" color="positive" type="submit" />
        </div>

      </div>
    </q-form>
  </div>
</template>

<script>
import SelectAutocomplete from '@/components/SelectAutocomplete.vue'
import { columnsParametro } from '@/constantes/descricao.const'
export default {
  name: 'DescricaoTab',
  components: {
    SelectAutocomplete
  },
  data () {
    return {
      classificacoes: [],
      subclassificacoes: [],
      descricoes: [],
      form: {
        classificacao: null,
        subclassificacao: null,
        descricao: null,
        parametros: []
      },
      columns: columnsParametro
    }
  },
  mounted () {
    this.getClassificacoes()
  },
  methods: {
    async filtrar () {
      try {
        this.$q.loading.show()
        if(this.form.parametros.length <= 0) {
          const response = await this.$services.filtro().filter({
            idOrdem: 0,
            idFamilia: 0,
            idGenero: 0,
            idsDescricao: this.form.descricao.id
          })
          console.log(response.data)
        } else {
          let ids = ''
          this.form.parametros.forEach((p) => ids+=p.id+',')
          ids = ids.slice(0, -1)
          const response = await this.$services.filtro().filter({
            idOrdem: 0,
            idFamilia: 0,
            idGenero: 0,
            idsDescricao: ids
          })
          console.log(response.data)
        }
        
      } catch (e) {
        console.log(e)
      } finally {
        this.$q.loading.hide()
      }
    },
    adicionarParametro () {
      this.form.parametros.push(this.form.descricao)
      this.form.classificacao = null
      this.form.subclassificacao = null
      this.form.descricao = null
      this.subclassificacoes = []
      this.descricoes = []
    },
    async getClassificacoes () {
      try {
        this.$q.loading.show()
        const response = await this.$services.classificacao().list()
        this.classificacoes = response.data
      } catch (e) {
        console.log(e)
      } finally {
        this.$q.loading.hide()
      }
    },
    async getSubclassificacoes () {
      this.form.subclassificacao = null
      this.form.descricao = null
      this.descricoes = []
      this.$q.loading.show()
      setTimeout(async () => {
        try {
          const response = await this.$services.subclassificacao().readParent(this.form.classificacao.id)
          this.subclassificacoes = response.data
        } catch (e) {
          console.log(e)
        } finally {
          this.$q.loading.hide()
        }
      }, 1000);
    },
    async getDescricoes () {
      this.form.descricao = null
      this.$q.loading.show()
      setTimeout(async () => {
        try {
          const response = await this.$services.descricao().readParent(this.form.subclassificacao.id)
          this.descricoes = response.data
        } catch (e) {
          console.log(e)
        } finally {
          this.$q.loading.hide()
        }
      }, 1000);
    }
  }
}
</script>
