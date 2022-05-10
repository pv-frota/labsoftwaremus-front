<template>
  <q-dialog ref="enabled" @show="onShow()" @hide="onHide()">
    <q-layout view="Lhh lpR fff" container class="bg-white">
      <q-header class="bg-primary">
        <q-toolbar>
          <q-toolbar-title>
            {{operacao}} Classe
          </q-toolbar-title>
          <q-btn icon="close" class="float-right" color="white" round flat dense @click="$emit('close')" />
        </q-toolbar>
      </q-header>
      <q-footer  class="bg-grey-2 text-primary">
        <q-toolbar inset>
          <q-toolbar-title>
            <q-btn label="Salvar" class="float-right" color="primary" flat dense @click="onSave()" />
            <q-btn label="Fechar" class="float-right" color="primary" flat dense @click="$emit('close')" />
          </q-toolbar-title>
        </q-toolbar>
      </q-footer>
      <q-page-container>
        <q-page>
          <q-input outlined stack-label
            v-model="form.nome" 
            label="Nome" 
          />
          <select-autocomplete
            v-model="form.filo" 
            :values="filos"
            label="Filo"
            attribute="nome"
          />
        </q-page>
      </q-page-container>
    </q-layout>
  </q-dialog>
</template>

<script>
import SelectAutocomplete from '@/components/SelectAutocomplete.vue'
export default {
  name: 'ClasseDialog',
  components: {
    SelectAutocomplete
  },
  props: {
    classe: {
      type: Number,
      required: false,
      default: 0
    }
  },
  data () {
    return {
      form: {
        id: 0,
        nome: '',
        filo: {
          id: 0,
          nome: 'Selecione um filo'
        }
      },
      filos: []
    }
  },
  computed: {
    operacao: function () {
      return this.classe !== 0 ? 'Editar' : 'Novo'
    }
  },
  methods: {
    async readClasse() {
      try {
        this.$q.loading.show()
        let response = await this.$services.classe().read(this.classe)
        this.form = response.data
      } catch (e) {
        console.log(e)
      } finally {
        this.$q.loading.hide()
      }
    },
    async getFilos() {
      try {
        this.$q.loading.show()
        let response = await this.$services.filo().list()
        this.filos = response.data
      } catch (e) {
        console.log(e)
      } finally {
        this.$q.loading.hide()
      }
    },
    async onShow() {
      if(this.operacao === 'Editar') {
        this.readClasse()
      }
      this.getFilos()
    },
    onHide () {
      this.form = {
        id: 0,
        nome: '',
        filo: {
          id: 0,
          nome: 'Selecione um filo'
        }
      }
    },
    async onSave () {
      try {
          this.$q.loading.show()
          let response = null
          this.form = {
            ...this.form,
            pai: this.form.filo.id
          }
          if(this.operacao === 'Editar') {
              response = await this.$services.classe().update(this.classe, this.form)
          } else {
              response = await this.$services.classe().create(this.form, true)
          }
          this.form = response.data
      } catch (e) {
          console.log(e)
      } finally {
          this.$q.loading.hide()
          this.$emit('close')
      }
    }
  }
}
</script>
