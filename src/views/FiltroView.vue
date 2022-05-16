<template>

  <q-page class="flex flex-center">

    <div class="row justify-center">

      <q-splitter
      v-model="splitterModel"
      >
        <template v-slot:before>
            <q-tabs
            v-model="tab"
            vertical
            class="text-teal"
            >
                <q-tab name="classificacao" label="Taxonomia" />
                <q-tab name="subclassificacao" label="Descrição" />
                <q-tab name="descricao" label="Avançada" />
            </q-tabs>
        </template>

        <template v-slot:after>
            <q-tab-panels
                v-model="tab"
                animated
                swipeable
                vertical
                transition-prev="slide-up"
                transition-next="slide-down"
                >
                <q-tab-panel name="classificacao">
                    <taxonomia-tab/>
                </q-tab-panel>

                <q-tab-panel name="subclassificacao">
                    <subclassificacao-tab/>
                </q-tab-panel>

                <q-tab-panel name="descricao">
                    <descricao-tab/>
                </q-tab-panel>

            </q-tab-panels>
      </template>

    </q-splitter>

    </div>
    
  </q-page>

</template>

<style scoped>

.form-group {
  display: flex;
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
import { ref } from 'vue'
import TaxonomiaTab from '@/components/tabs/filtro/TaxonomiaTab.vue'
import SubclassificacaoTab from '@/components/tabs/especificacao/SubclassificacaoTab.vue'
import DescricaoTab from '@/components/tabs/especificacao/DescricaoTab.vue'

export default {
  name: 'FiltroView',
  components: {
    TaxonomiaTab,
    SubclassificacaoTab,
    DescricaoTab
  },
  setup () {
    return {
      tab: ref('classificacao'),
      splitterModel: ref(20)
    }
  },
  data () {
    return {
      form: {
        login: "",
        senha: "",
      },
    };
  },
  methods: {
    async filtrar () {
        
      const response = await this.$services
        .auth()
        .login(this.form.login, this.form.senha)
      this.$store.commit('setUsuario', response.data);
      this.$router.push('/')
    }
  }
}
</script>
