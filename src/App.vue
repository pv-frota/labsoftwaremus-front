<template>

  <q-layout view="hhh Lpr lFf">

    <base-header />

    <q-page-container>

      <router-view />
      
    </q-page-container>
    
    <base-footer />

  </q-layout>

</template>

<script>

// importações
import BaseHeader from '@/components/BaseHeader.vue'
import BaseFooter from '@/components/BaseFooter.vue'


export default {
  name: 'App',
  components: {
    BaseHeader,
    BaseFooter,
  },
}
</script>

