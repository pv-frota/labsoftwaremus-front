<template>
  <q-splitter
    v-model="splitterModel" disable>
    <template v-slot:before>
        <div class="q-pa-md">
            <div class="column justify-center">
              <img class="q-mb-md q-mx-xl"
                :src="tempImagem ? tempImagem : form.imagemEspecie ? form.imagemEspecie.imagem : ''" 
              />
            </div>
            <q-file outlined dense class="q-mb-md q-mx-xl"
                v-model="form.imagem"
                label="Upload imagem"
                accept=".jpg, image/*"
            />

            <select-autocomplete class="q-mb-md q-mx-xl"
              v-model="form.reino" 
              :values="reinos"
              label="Reino"
              attribute="nome"
              @select="getFilos"
            />

            <select-autocomplete class="q-mb-md q-mx-xl"
              v-model="form.filo" 
              :values="filos"
              :disable="filos.length == 0"
              label="Filo"
              attribute="nome"
              @select="getClasses"
            />

            <select-autocomplete class="q-mb-md q-mx-xl"
              v-model="form.classe" 
              :values="classes"
              :disable="classes.length == 0"
              label="Classe"
              attribute="nome"
              @select="getOrdens"
            />

            <select-autocomplete class="q-mb-md q-mx-xl"
              v-model="form.ordem" 
              :values="ordens"
              :disable="ordens.length == 0"
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
    </template>

    <template v-slot:after>
        <div class="q-pa-md row">
          <q-input outlined stack-label class="col-6 q-mb-md"
            input-class="text-italic"
            v-model="form.nome" 
            label="Nome Científico" 
          />
          <div class="col-6"/>
          <q-input outlined stack-label class="col-6 q-mb-md"
            v-model="form.nomeVulgar" 
            label="Nome Vulgar" 
          />
          <div class="col-6"/>
          <q-input outlined stack-label class="col-6 q-mb-md"
            v-model="form.descricaoLivre" 
            label="Descrição Livre" 
            type="textarea"
          />
          <div class="col-6"/>
        </div>
        <div v-for="c in classificacoes" :key="c">
          <p class="q-px-md">Descrições {{c.nome}}s</p>
          <q-separator />
          <div class="q-pa-md row">
            <select-autocomplete-async class="col-6 q-mb-md"
              v-model="subclassificacao" 
              :promise="getSubclassificacoes(c.id)"
              label="Subclassificação"
              attribute="nome"
              @select="getDescricoes"
            />
            <div class="col-6"/>
            <select-autocomplete class="col-6 q-mb-md"
              v-model="descricao" 
              :values="descricoes"
              :disable="descricoes.length == 0"
              label="Descrição"
              attribute="valor"  
            />
            <div class="col-6"/>
          </div>
        </div>
    </template>
  </q-splitter>
</template>

<script>
import { ref } from 'vue'
import SelectAutocomplete from '@/components/SelectAutocomplete.vue'
import SelectAutocompleteAsync from '@/components/SelectAutocompleteAsync.vue'

export default {
  name: 'FormularioInsetoView',
  components: {
    SelectAutocomplete,
    SelectAutocompleteAsync
  },
  setup () {
    return {
      splitterModel: ref(20) // start at 50%
    }
  },
  data () {
    return {
        tempImagem: null,
        reinos: [],
        filos: [],
        classes: [],
        ordens: [],
        familias: [],
        generos: [],
        classificacoes: [
          {id: 1, nome: 'Morfológica'}
        ],
        descricoes: [],
        subclassificacao: null,
        descricao: null,
        subvalor: null,
        form: {
            id: 0,
            nome: '',
            nomeVulgar: '',
            descricaoLivre: '',
            imagem: null,
            reino: null,
            filo: null,
            classe: null,
            ordem: null,
            familia: null,
            genero: null,
            descricoes: [],
        },    
    }
  },
  watch: {
    'form.imagem': async function (file) {
      this.tempImagem = await this.toBase64(file)
    }
  },
  mounted () {
    this.getReinos()
  },
  methods: {
    test() {
      console.log(this.form.imagem)
    },
    async getReinos() {
        try {
          this.$q.loading.show()
          let response = await this.$services.reino().list()
          this.reinos = response.data
        } catch (e) {
            console.log(e)
        } finally {
            this.$q.loading.hide()
        }
    },
    async getFilos () {
      this.form.filo = null
      this.form.classe = null
      this.form.ordem = null
      this.form.familia = null
      this.form.genero = null
      this.classes = []
      this.ordens = []
      this.familias = []
      this.generos = []
      this.$q.loading.show()
      setTimeout(async () => {
        try {
          const response = await this.$services.filo().readParent(this.form.reino.id)
          this.filos = response.data
        } catch (e) {
          console.log(e)
        } finally {
          this.$q.loading.hide()
        }
      }, 1000);
    },
    async getClasses () {
      this.form.classe = null
      this.form.ordem = null
      this.form.familia = null
      this.form.genero = null
      this.ordens = []
      this.familias = []
      this.generos = []
      this.$q.loading.show()
      setTimeout(async () => {
        try {
          const response = await this.$services.classe().readParent(this.form.filo.id)
          this.classes = response.data
        } catch (e) {
          console.log(e)
        } finally {
          this.$q.loading.hide()
        }
      }, 1000);
    },
    async getOrdens () {
      this.form.ordem = null
      this.form.familia = null
      this.form.genero = null
      this.familias = []
      this.generos = []
      this.$q.loading.show()
      setTimeout(async () => {
        try {
          const response = await this.$services.ordem().readParent(this.form.classe.id)
          this.ordens = response.data
        } catch (e) {
          console.log(e)
        } finally {
          this.$q.loading.hide()
        }
      }, 1000);
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
    },
    async getSubclassificacoes(id) {
      try {
        this.$q.loading.show()
        let response = await this.$services.subclassificacao().readParent(id)
        return response.data
      } catch (e) {
        console.log(e)
      } finally {
        this.$q.loading.hide()
      }
    },
    async getDescricoes () {
      this.descricao = null
      this.$q.loading.show()
      setTimeout(async () => {
        try {
          const response = await this.$services.descricao().readParent(this.subclassificacao.id)
          this.descricoes = response.data
          console.log(this.descricoes)
        } catch (e) {
          console.log(e)
        } finally {
          this.$q.loading.hide()
        }
      }, 1000);
    },
    toBase64 (file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = error => reject(error)
      })
    }
  }
}
</script>