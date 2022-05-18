<template>
  <div class="column">
    <q-form @submit="filtrar">
      <div class="bg-light-green-1">

        <p class="q-pa-md">Busca Avançada</p>

        <div class="row">
          <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-px-sm">
            <select-autocomplete class="q-mb-md q-mx-xl"
              v-model="form.ordem" 
              :values="ordens"
              label="Ordem"
              attribute="nome"
              @select="getFamilias"
            />

            <select-autocomplete class="q-mb-md q-mx-xl"
              v-model="form.familia" 
              :values="familias"
              :disable="familias.length == 0"
              label="Familia"
              attribute="nome"
              @select="getGeneros"
            />

            <select-autocomplete class="q-mb-md q-mx-xl"
              v-model="form.genero" 
              :values="generos"
              :disable="generos.length == 0"
              label="Gênero"
              attribute="nome"
            />
          </div>
          <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
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
  name: 'AvancadoTab',
  components: {
    SelectAutocomplete
  },
  data () {
    return {
      classificacoes: [],
      subclassificacoes: [],
      descricoes: [],
      ordens: [],
      familias: [],
      generos: [],
      form: {
        classificacao: null,
        subclassificacao: null,
        descricao: null,
        ordem: null,
        familia: null,
        genero: null,
        parametros: []
      },
      columns: columnsParametro
    }
  },
  mounted () {
    this.getClassificacoes()
    this.getOrdens()
  },
  methods: {
    async filtrar () {
      try {
        this.$q.loading.show()
        let filtro = {
          idOrdem: this.form.ordem != null ? this.form.ordem.id : 0,
          idFamilia: this.form.familia != null ? this.form.familia.id : 0,
          idGenero: this.form.genero != null ? this.form.genero.id : 0
        }
        if(this.form.parametros.length <= 0) {
          const response = await this.$services.filtro().filter({
            ...filtro,
            idsDescricao: this.form.descricao.id
          })
          console.log(response.data)
        } else {
          let ids = ''
          this.form.parametros.forEach((p) => ids+=p.id+',')
          ids = ids.slice(0, -1)
          const response = await this.$services.filtro().filter({
            ...filtro,
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
    },
    async getOrdens () {
      try {
        this.$q.loading.show()
        const response = await this.$services.ordem().list()
        this.ordens = response.data
      } catch (e) {
        console.log(e)
      } finally {
        this.$q.loading.hide()
      }
    },
    async getFamilias () {
      this.form.familia = null
      this.form.genero = null
      this.generos = []
      this.$q.loading.show()
      setTimeout(async () => {
        try {
          const response = await this.$services.familia().readParent(this.form.ordem.id)
          this.familias = response.data
        } catch (e) {
          console.log(e)
        } finally {
          this.$q.loading.hide()
        }
      }, 1000);
    },
    async getGeneros () {
      this.form.genero = null
      this.$q.loading.show()
      setTimeout(async () => {
        try {
          const response = await this.$services.genero().readParent(this.form.familia.id)
          this.generos = response.data
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
