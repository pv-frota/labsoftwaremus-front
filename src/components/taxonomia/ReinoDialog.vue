<template>
  <q-dialog ref="enabled" @show="onShow()" @hide="onHide()">
    <q-layout view="Lhh lpR fff" container class="bg-white">
      <q-header class="bg-primary">
        <q-toolbar>
          <q-toolbar-title>
            {{operacao}} Reino
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
  name: 'ReinoDialog',
  props: {
    reino: {
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
        return this.reino !== 0 ? 'Editar' : 'Novo'
    }
  },
  methods: {
    async onShow() {
        if(this.operacao === 'Editar') {
            try {
                this.$q.loading.show()
                let response = await this.$services.reino().read(this.reino)
                this.form = response.data
            } catch (e) {
                console.log(e)
            } finally {
                this.$q.loading.hide()
            }
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
                response = await this.$services.reino().update(this.reino, this.form)
            } else {
                response = await this.$services.reino().create(this.form, true)
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
