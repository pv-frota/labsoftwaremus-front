<template>
  <div class="column q-pa-xl" style="max-width: 40%">
    <q-form @submit="filtrar">
      <div class="form-group">
        <div class="form-input" style="max-width: 90%">

          <p>Busca em cadeia</p>

          <select-autocomplete class="q-my-md"
            v-model="form.ordem" 
            :values="ordens"
            label="Ordem"
            attribute="nome"
            @select="getFamilias"
          />

          <select-autocomplete class="q-my-md"
            v-model="form.familia" 
            :values="familias"
            :disable="familias.length == 0"
            label="Familia"
            attribute="nome"
            @select="getGeneros"
          />

          <select-autocomplete class="q-my-md"
            v-model="form.genero" 
            :values="generos"
            :disable="generos.length == 0"
            label="Gênero"
            attribute="nome"
          />

          <q-btn class="q-my-md" label="Buscar" color="positive" type="submit" />

        </div>
      </div>
    </q-form>
  </div>
</template>

<style scoped>

.form-group {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 500px;
  height: 500px;
  background-color: lightcyan;
  border-radius: 25px;
}

.form-input{
  text-align: center;
}
</style>

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
      form: {
        ordem: null,
        familia: null,
        genero: null
      },
      ordemSelecionada: null,
      familiaSelecionada: null,
      generoSelecionado: null
    }
  },
  mounted () {
    this.getOrdens()
  },
  methods: {
    async filtrar () {
      try {
        this.$q.loading.show()
        const response = await this.$services.filtro().filter({
          idOrdem: this.form.ordem.id,
          idFamilia: this.form.familia != null ? this.form.familia.id : 0,
          idGenero: this.form.genero != null ? this.form.genero.id : 0,
          idsDescricao: 0
        })
        console.log(response.data)
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
