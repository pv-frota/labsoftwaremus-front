<template>
  <q-dialog ref="enabled" @show="onShow()" @hide="onHide()">
    <q-layout view="Lhh lpR fff" container class="bg-white">
      <q-header class="bg-primary">
        <q-toolbar>
          <q-toolbar-title>
            {{operacao}} Subclassificação
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
            v-model="form.classificacao" 
            :values="classificacaos"
            label="Classificação"
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
  name: 'SubclassificacaoDialog',
  components: {
    SelectAutocomplete
  },
  props: {
    subclassificacao: {
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
        classificacao: {
          id: 0,
          nome: 'Selecione uma classificação'
        }
      },
      classificacaos: []
    }
  },
  computed: {
    operacao: function () {
      return this.subclassificacao !== 0 ? 'Editar' : 'Novo'
    }
  },
  methods: {
    async readSubclassificacao() {
      try {
        this.$q.loading.show()
        let response = await this.$services.subclassificacao().read(this.subclassificacao)
        this.form = response.data
      } catch (e) {
        console.log(e)
      } finally {
        this.$q.loading.hide()
      }
    },
    async getClasificacaos() {
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
    async onShow() {
      if(this.operacao === 'Editar') {
        this.readSubclassificacao()
      }
      this.getClasificacaos()
    },
    onHide () {
      this.form = {
        id: 0,
        nome: '',
        classificacao: {
          id: 0,
          nome: 'Selecione uma classificacão'
        }
      }
    },
    async onSave () {
      try {
          this.$q.loading.show()
          let response = null
          this.form = {
            ...this.form,
            pai: this.form.classificacao.id
          }
          if(this.operacao === 'Editar') {
              response = await this.$services.subclassificacao().update(this.subclassificacao, this.form)
          } else {
              response = await this.$services.subclassificacao().create(this.form, true)
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
