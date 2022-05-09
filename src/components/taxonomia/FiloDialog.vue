<template>
  <q-dialog ref="enabled" @show="onShow()" @hide="onHide()">
    <q-layout view="Lhh lpR fff" container class="bg-white">
      <q-header class="bg-primary">
        <q-toolbar>
          <q-toolbar-title>
            {{operacao}} Filo
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
            v-model="form.reino" 
            :values="reinos"
            label="Reino"
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
  name: 'FiloDialog',
  components: {
    SelectAutocomplete
  },
  props: {
    filo: {
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
        reino: {
          id: 0,
          nome: 'Selecione um reino'
        }
      },
      reinos: []
    }
  },
  computed: {
    operacao: function () {
      return this.filo !== 0 ? 'Editar' : 'Novo'
    }
  },
  methods: {
    async readFilo() {
      try {
        this.$q.loading.show()
        let response = await this.$services.filo().read(this.filo)
        this.form = response.data
      } catch (e) {
        console.log(e)
      } finally {
        this.$q.loading.hide()
      }
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
    async onShow() {
      if(this.operacao === 'Editar') {
        this.readFilo()
      }
      this.getReinos()
    },
    onHide () {
      this.form = {
        id: 0,
        nome: '',
        reino: {
          id: 0,
          nome: 'Selecione um reino'
        }
      }
    },
    async onSave () {
      try {
          this.$q.loading.show()
          let response = null
          this.form = {
            ...this.form,
            pai: this.form.reino.id
          }
          if(this.operacao === 'Editar') {
              response = await this.$services.filo().update(this.filo, this.form)
          } else {
              response = await this.$services.filo().create(this.form, true)
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
