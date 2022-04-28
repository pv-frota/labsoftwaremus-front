<template>
  <q-layout view="hhh Lpr lFf">
    <base-header/>
    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>


<script>
import BaseHeader from '@/components/BaseHeader.vue'
export default {
  name: 'App',
  components: {
    BaseHeader
  },
}
</script>

