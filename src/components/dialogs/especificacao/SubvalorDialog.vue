<template>
  <q-dialog ref="enabled" @show="onShow()" @hide="onHide()">
    <q-layout view="Lhh lpR fff" container class="bg-white">
      <q-header class="bg-primary">
        <q-toolbar>
          <q-toolbar-title>
            {{operacao}} Subvalor
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
          <select-autocomplete
            v-model="form.pai" 
            :values="descricaos"
            label="Descrição"
            attribute="valor"
          />
          <q-input outlined stack-label
            v-model="form.valor" 
            label="Nome" 
          />
          <q-input outlined stack-label
            v-model="form.subvalor" 
            label="Informação extra" 
          />
        </q-page>
      </q-page-container>
    </q-layout>
  </q-dialog>
</template>

<script>
import SelectAutocomplete from '@/components/SelectAutocomplete.vue'
export default {
  name: 'SubvalorDialog',
  components: {
    SelectAutocomplete
  },
  props: {
    subvalor: {
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
        pai: {
          id: 0,
          valor: 'Selecione uma descrição'
        }
      },
      descricaos: []
    }
  },
  computed: {
    operacao: function () {
      return this.subvalor !== 0 ? 'Editar' : 'Novo'
    }
  },
  methods: {
    async readSubvalor() {
      try {
        this.$q.loading.show()
        let response = await this.$services.subvalor().read(this.subvalor)
        this.form = response.data
      } catch (e) {
        console.log(e)
      } finally {
        this.$q.loading.hide()
      }
    },
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
    async onShow() {
      if(this.operacao === 'Editar') {
        this.readSubvalor()
      }
      this.getDescricaos()
    },
    onHide () {
      this.form = {
        id: 0,
        nome: '',
        pai: {
          id: 0,
          valor: 'Selecione uma descrição'
        }
      }
    },
    async onSave () {
      try {
          this.$q.loading.show()
          let response = null
          this.form = {
            ...this.form,
            subclassificacao: this.form.pai.subclassificacao
          }
          console.log(this.form)
          if(this.operacao === 'Editar') {
              response = await this.$services.subvalor().update(this.subvalor, this.form)
          } else {
              response = await this.$services.subvalor().create(this.form, true)
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
