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
          transition-prev="jump-up"
          transition-next="jump-up"
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
            <classe-tab/>
          </q-tab-panel>

          <q-tab-panel name="familia">
            <classe-tab/>
          </q-tab-panel>

          <q-tab-panel name="genero">
            <classe-tab/>
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

export default {
  name: 'TaxonomiaView',
  components: {
    ReinoTab,
    FiloTab,
    ClasseTab
  },
  setup () {
    return {
      tab: ref('reino'),
      splitterModel: ref(20)
    }
  }
}
</script>
