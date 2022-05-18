<template>
  <q-page class="column justify-center items-center">
    <div v-show="!vertical">
      <q-tabs
        v-model="tab"
        class="text-teal"
      >
          <q-tab name="taxonomia" label="Taxonomia" />
          <q-tab name="descricao" label="Descrição" />
          <q-tab name="subclassificacao" label="Avançada" />
      </q-tabs>
      <q-tab-panels
          v-model="tab"
          animated
          swipeable
          transition-prev="slide-right"
          transition-next="slide-left"
        >
          <q-tab-panel name="taxonomia">
              <taxonomia-tab/>
          </q-tab-panel>

            <q-tab-panel name="descricao">
              <descricao-tab/>
          </q-tab-panel>

          <q-tab-panel name="subclassificacao">
              <subclassificacao-tab/>
          </q-tab-panel>
        </q-tab-panels>
    </div>
    <q-splitter v-model="splitterModel" v-show="vertical" style="height: 560px; width: 60%">
      <template v-slot:before>
        <q-tabs
          v-model="tab"
          :vertical="vertical"
          class="text-teal"
        >
            <q-tab name="taxonomia" label="Taxonomia" />
            <q-tab name="descricao" label="Descrição" />
            <q-tab name="subclassificacao" label="Avançada" />
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
          <q-tab-panel name="taxonomia">
              <taxonomia-tab/>
          </q-tab-panel>

            <q-tab-panel name="descricao">
              <descricao-tab/>
          </q-tab-panel>

          <q-tab-panel name="subclassificacao">
              <subclassificacao-tab/>
          </q-tab-panel>
        </q-tab-panels>
      </template>
    </q-splitter>
  </q-page>
</template>

<script>
import { ref } from 'vue'
import { useQuasar } from 'quasar'
import TaxonomiaTab from '@/components/tabs/filtro/TaxonomiaTab.vue'
import SubclassificacaoTab from '@/components/tabs/especificacao/SubclassificacaoTab.vue'
import DescricaoTab from '@/components/tabs/filtro/DescricaoTab.vue'

export default {
  name: 'FiltroView',
  components: {
    TaxonomiaTab,
    SubclassificacaoTab,
    DescricaoTab
  },
  setup () {
    const $q = useQuasar()
    return {
      tab: ref('taxonomia'),
      splitterModel: ref(20),
      vertical: $q.screen.lg
    }
  }
}
</script>
