<template>
  <q-dialog ref="enabled" @show="onShow()" @hide="onHide()">
    <q-layout view="Lhh lpR fff" container class="bg-white">
      <q-header class="bg-primary">
        <q-toolbar>
          <q-toolbar-title>
            {{operacao}} Familia
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
            v-model="form.ordem" 
            :values="ordems"
            label="Ordem"
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
  name: 'FamiliaDialog',
  components: {
    SelectAutocomplete
  },
  props: {
    familia: {
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
        ordem: {
          id: 0,
          nome: 'Selecione uma ordem'
        }
      },
      ordems: []
    }
  },
  computed: {
    operacao: function () {
      return this.familia !== 0 ? 'Editar' : 'Novo'
    }
  },
  methods: {
    async readFamilia() {
      try {
        this.$q.loading.show()
        let response = await this.$services.familia().read(this.familia)
        this.form = response.data
      } catch (e) {
        console.log(e)
      } finally {
        this.$q.loading.hide()
      }
    },
    async getOrdems() {
      try {
        this.$q.loading.show()
        let response = await this.$services.ordem().list()
        this.ordems = response.data
      } catch (e) {
        console.log(e)
      } finally {
        this.$q.loading.hide()
      }
    },
    async onShow() {
      if(this.operacao === 'Editar') {
        this.readFamilia()
      }
      this.getOrdems()
    },
    onHide () {
      this.form = {
        id: 0,
        nome: '',
        ordem: {
          id: 0,
          nome: 'Selecione uma ordem'
        }
      }
    },
    async onSave () {
      try {
          this.$q.loading.show()
          let response = null
          this.form = {
            ...this.form,
            pai: this.form.ordem.id
          }
          if(this.operacao === 'Editar') {
              response = await this.$services.familia().update(this.familia, this.form)
          } else {
              response = await this.$services.familia().create(this.form, true)
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
