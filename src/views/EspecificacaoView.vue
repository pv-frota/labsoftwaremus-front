<template>
    <q-splitter
      v-model="splitterModel"
    >
      <template v-slot:before>
        <q-tabs
          v-model="tab"
          vertical
          class="text-teal"
        >
          <q-tab name="classificacao" label="Classificação" />
          <q-tab name="subclassificacao" label="Subclassificação" />
          <q-tab name="descricao" label="Descrição" />
          <q-tab name="subvalor" label="Subvalor" />
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
            <classificacao-tab/>
          </q-tab-panel>

          <q-tab-panel name="subclassificacao">
            <subclassificacao-tab/>
          </q-tab-panel>

          <q-tab-panel name="descricao">
            <descricao-tab/>
          </q-tab-panel>

          <q-tab-panel name="subvalor">
            <subvalor-tab/>
          </q-tab-panel>

        </q-tab-panels>
      </template>

    </q-splitter>
</template>

<script>
import { ref } from 'vue'
import ClassificacaoTab from '@/components/tabs/especificacao/ClassificacaoTab.vue'
import SubclassificacaoTab from '@/components/tabs/especificacao/SubclassificacaoTab.vue'
import DescricaoTab from '@/components/tabs/especificacao/DescricaoTab.vue'
import SubvalorTab from '@/components/tabs/especificacao/SubvalorTab.vue'

export default {
  name: 'EspecificacaoView',
  components: {
    ClassificacaoTab,
    SubclassificacaoTab,
    DescricaoTab,
    SubvalorTab
  },
  setup () {
    return {
      tab: ref('classificacao'),
      splitterModel: ref(20)
    }
  }
}
</script>
