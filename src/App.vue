<template>
  <q-layout view="hhh Lpr lFf">

    <base-header/>

    <q-page-container>

      <div class="fit row q-page-container">

        <div class="col-12 jumbotron-container">

          <div class="jumbotron">

            <h3 class="jumbotron-text q-pt-xl">Museu Virtual de Entomologia</h3>

          </div>

        </div>

        <div class="col-12 carousel-container">

          <div class="q-gutter-md">

            <q-carousel
              v-model="slide"
              transition-prev="scale"
              transition-next="scale"
              swipeable
              animated
              control-color="white"
              navigation
              padding
              arrows
              height="300px"
              class="bg-primary text-white shadow-1 rounded-borders"
            >
              <q-carousel-slide name="style" class="column no-wrap flex-center">
                <q-icon name="style" size="56px" />
                <div class="q-mt-md text-center">
                  {{ lorem }}
                </div>
              </q-carousel-slide>
              <q-carousel-slide name="tv" class="column no-wrap flex-center">
                <q-icon name="live_tv" size="56px" />
                <div class="q-mt-md text-center">
                  {{ lorem }}
                </div>
              </q-carousel-slide>
              <q-carousel-slide name="layers" class="column no-wrap flex-center">
                <q-icon name="layers" size="56px" />
                <div class="q-mt-md text-center">
                  {{ lorem }}
                </div>
              </q-carousel-slide>
              <q-carousel-slide name="map" class="column no-wrap flex-center">
                <q-icon name="terrain" size="56px" />
                <div class="q-mt-md text-center">
                  {{ lorem }}
                </div>
              </q-carousel-slide>
            </q-carousel>

          </div>

        </div>

      </div>
      
      <router-view/>
    </q-page-container>

    <base-footer/>

  </q-layout>
</template>

<style scoped>

.jumbotron{
  height: 250px;
  
}

.jumbotron-container{
  text-align: center;
  color: white;
  background-image: url("https://images.pexels.com/photos/5643880/pexels-photo-5643880.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1");
  background-size:cover;
  background-color: rgba(0, 0, 0, 0.4);
}

.carousel-container{
  background-color: rgba(6, 190, 83, 0.4);
  height: 100px;
}


</style>

<script>
// importações
import BaseHeader from '@/components/BaseHeader.vue'
import BaseFooter from '@/components/BaseFooter.vue'
import { ref } from 'vue'

export default {
  name: 'App',
  components: {
    BaseHeader,
    BaseFooter,
  },

  setup () {
    return {
      slide: ref('style'),
      lorem: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque voluptatem totam, architecto cupiditate officia rerum, error dignissimos praesentium libero ab nemo.'
    }
  }
}
</script>

