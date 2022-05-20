<template>
  <q-dialog ref="enabled" @show="onShow()" @hide="onHide()">
    <q-layout view="Lhh lpR fff" container class="bg-white">
      <q-header class="bg-primary">
        <q-toolbar>
          <q-toolbar-title>
            {{operacao}} Descrição
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
            v-model="form.valor" 
            label="Nome" 
          />
          <select-autocomplete
            v-model="form.subclassificacao" 
            :values="subclassificacaos"
            label="Subclassificação"
            attribute="nome"
          />
          <img :src="form.imagemDescricao ? form.imagemDescricao.imagem : ''" />
          <q-file
            style="max-width: 300px"
            v-model="form.imagem"
            filled
            rounded
            label="Restricted to images"
            accept=".jpg, image/*"
          />
        </q-page>
      </q-page-container>
    </q-layout>
  </q-dialog>
</template>

<script>
import SelectAutocomplete from '@/components/SelectAutocomplete.vue'
export default {
  name: 'DescricaoDialog',
  components: {
    SelectAutocomplete
  },
  props: {
    descricao: {
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
        imagem: null,
        subclassificacao: {
          id: 0,
          nome: 'Selecione uma subclassificação'
        }
      },
      subclassificacaos: []
    }
  },
  computed: {
    operacao: function () {
      return this.descricao !== 0 ? 'Editar' : 'Novo'
    }
  },
  methods: {
    async readDescricao() {
      try {
        this.$q.loading.show()
        let response = await this.$services.descricao().read(this.descricao)
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
        let response = await this.$services.subclassificacao().list()
        this.subclassificacaos = response.data
      } catch (e) {
        console.log(e)
      } finally {
        this.$q.loading.hide()
      }
    },
    async onShow() {
      if(this.operacao === 'Editar') {
        this.readDescricao()
      }
      this.getClasificacaos()
    },
    onHide () {
      this.form = {
        id: 0,
        nome: '',
        subclassificacao: {
          id: 0,
          nome: 'Selecione uma subclassificacão'
        }
      }
    },
    async onSave () {
      try {
        this.$q.loading.show()
        let response = {}
        let imagemBase64 = null 
        if(this.form.imagem) {
          let base64 = await this.toBase64(this.form.imagem)
          imagemBase64 = {
            id: 0,
            imagem: base64
          }
        }
        if(this.operacao === 'Editar') {
          if(this.form.imagemDescricao && this.form.imagem) {
            imagemBase64.id = this.form.imagemDescricao.id
          }
          if(this.form.imagem) {
            response = await this.$services.descricao().update(this.descricao, {
              ...this.form,
              imagemDescricao: imagemBase64
            })
          } else {
            response = await this.$services.descricao().update(this.descricao,this.form)
          }
        } else {
          response = await this.$services.descricao().create({
            ...this.form,
            imagemDescricao: imagemBase64
          }, true)
        }
        this.form = response.data
      } catch (e) {
        console.log(e)
      } finally {
        this.$q.loading.hide()
        this.$emit('close')
      }
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
