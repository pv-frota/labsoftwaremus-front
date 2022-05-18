<template>
  <div class="column items-stretch">
    <q-form @submit="filtrar">
        <div class="bg-light-green-1">

          <p class="q-pa-md">Busca em cadeia</p>

          <div class="column justify-center">
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

          <p class="q-pa-md">Busca Livre</p>

          <div class="row items-center q-px-xl">
            <select-autocomplete class="col-xs-12 col-sm-12 col-md-4 col-lg-3 q-mx-auto"
              v-model="form.operacaoSelecionada" 
              :values="operacoes"
              label="Método"
              attribute="nome"
            />
            <q-input class="col-xs-12 col-sm-12 col-md-4 col-lg-6 q-mx-auto"
              outlined stack-label
              dense
              v-model="form.valor"
              label="Nome"
            />
            <select-autocomplete class="q-mx-auto col-xs-12 col-sm-12 col-md-4 col-lg-3 q-mx-auto"
              v-model="form.parametroSelecionado" 
              :values="parametros"
              label="Filtrar por"
              attribute="nome"
            />
          </div>

          <div class="row justify-end">
            <q-btn class="q-ma-md" label="Buscar" color="positive" type="submit" />
          </div>

        </div>
    </q-form>
  </div>
</template>

<script>
import SelectAutocomplete from '@/components/SelectAutocomplete.vue'
export default {
  name: 'TaxonomiaTab',
  components: {
    SelectAutocomplete
  },
  data () {
    return {
      ordens: [],
      familias: [],
      generos: [],
      operacoes: [
        {
          nome: 'Possui'
        },
        {
          nome: 'Começa'
        },
        {
          nome: 'Termina'
        }
      ],
      parametros: [
        {
          nome: 'Todos'
        },
        {
          nome: 'Ordem'
        },
        {
          nome: 'Familia'
        },
        {
          nome: 'Genero'
        },
        {
          nome: 'Especie'
        },
      ],
      form: {
        ordem: null,
        familia: null,
        genero: null,
        valor: '',
        operacaoSelecionada: null,
        parametroSelecionado: null
      }
    }
  },
  mounted () {
    this.getOrdens()
  },
  methods: {
    async filtrar () {
      try {
        this.$q.loading.show()
        if(this.form.valor) {
          const response = await this.$services.filtro().buscaLivre(
            this.form.parametroSelecionado.nome.toLowerCase(), 
            this.form.operacaoSelecionada.nome.toLowerCase(), 
            this.form.valor
          )
          console.log(response.data)
        } else {
          const response = await this.$services.filtro().filter({
            idOrdem: this.form.ordem.id,
            idFamilia: this.form.familia != null ? this.form.familia.id : 0,
            idGenero: this.form.genero != null ? this.form.genero.id : 0,
            idsDescricao: 0
          })
          console.log(response.data)
        }
        
      } catch (e) {
        console.log(e)
      } finally {
        this.$q.loading.hide()
      }
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
