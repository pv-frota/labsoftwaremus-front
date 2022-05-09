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
          <q-tab name="reino" label="Reino" />
          <q-tab name="filo" label="Filo" />
          <q-tab name="classe" label="Classe" />
          <q-tab name="ordem" label="Ordem" />
          <q-tab name="familia" label="Familia" />
          <q-tab name="genero" label="Gênero" />
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
          <q-tab-panel name="reino">
            <reino-tab/>
          </q-tab-panel>

          <q-tab-panel name="filo">
            <filo-tab/>
          </q-tab-panel>

          <q-tab-panel name="classe">
            <classe-tab/>
          </q-tab-panel>

          <q-tab-panel name="ordem">
            <ordem-tab/>
          </q-tab-panel>

          <q-tab-panel name="familia">
            <familia-tab/>
          </q-tab-panel>

          <q-tab-panel name="genero">
            <genero-tab/>
          </q-tab-panel>
        </q-tab-panels>
      </template>

    </q-splitter>
</template>

<script>
import { ref } from 'vue'
import ReinoTab from '@/components/taxonomia/ReinoTab.vue'
import FiloTab from '@/components/taxonomia/FiloTab.vue'
import ClasseTab from '@/components/taxonomia/ClasseTab.vue'
import OrdemTab from '@/components/taxonomia/OrdemTab.vue'
import FamiliaTab from '@/components/taxonomia/FamiliaTab.vue'
import GeneroTab from '@/components/taxonomia/GeneroTab.vue'

export default {
  name: 'TaxonomiaView',
  components: {
    ReinoTab,
    FiloTab,
    ClasseTab,
    OrdemTab,
    FamiliaTab,
    GeneroTab
  },
  setup () {
    return {
      tab: ref('reino'),
      splitterModel: ref(20)
    }
  }
}
</script>
