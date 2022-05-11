<template>
  <q-dialog ref="enabled" @show="onShow()" @hide="onHide()">
    <q-layout view="Lhh lpR fff" container class="bg-white">
      <q-header class="bg-primary">
        <q-toolbar>
          <q-toolbar-title>
            {{operacao}} Classificação
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
        </q-page>
      </q-page-container>
    </q-layout>
  </q-dialog>
</template>

<script>
export default {
  name: 'ClassificacaoDialog',
  props: {
    classificacao: {
      type: Number,
      required: false,
      default: 0
    }
  },
  data () {
    return {
      form: {
        id: 0,
        nome: ''
      }
    }
  },
  computed: {
    operacao: function () {
      return this.classificacao !== 0 ? 'Editar' : 'Novo'
    }
  },
  methods: {
    async readClassificacao() {
      try {
        this.$q.loading.show()
        let response = await this.$services.classificacao().read(this.classificacao)
        this.form = response.data
      } catch (e) {
        console.log(e)
      } finally {
        this.$q.loading.hide()
      }
    },
    async onShow() {
      if(this.operacao === 'Editar') {
        this.readClassificacao()
      }
    },
    onHide () {
      this.form = {
        id: 0,
        nome: ''
      }
    },
    async onSave () {
      try {
          this.$q.loading.show()
          let response = null
          if(this.operacao === 'Editar') {
              response = await this.$services.classificacao().update(this.classificacao, this.form)
          } else {
              response = await this.$services.classificacao().create(this.form, true)
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
