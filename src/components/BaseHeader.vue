<template>
  <q-header class="bg-green-6">
    <div class="column" style="height: 100%">
      <div class="col-sm-2" />
      <div class="row col-sm-8 items-center">
        <img
          style="height: 100%"
          src="https://novo.ufra.edu.br/images/images/brasao-ufra-2017.png"
        />
        <div class="column">
          <div class="text-h5">Museu Virtual de Entomologia</div>
          <div class="text-subtitle1">Instituto de Ciências Agrárias - ICA</div>
        </div>
        <q-space />
        <q-btn label="Home" />
        <div class="col-xs-1" />
        <q-btn label="Buscar" />
        <div class="col-xs-1" />
        <q-btn label="Contato" />
        <q-space />
        <q-btn label="Login"  v-if="!isLogado" @click="goToLogin()"/>
        <q-btn-dropdown v-if="isLogado" color="primary" label="Admin">
          <q-list>
            <q-item clickable v-close-popup @click="onItemClick">
              <q-item-section>
                <q-item-label>Novo Inseto</q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable v-close-popup @click="onItemClick">
              <q-item-section>
                <q-item-label>Classificações</q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable v-close-popup @click="onItemClick">
              <q-item-section>
                <q-item-label>Sair</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
        <div class="col-xs-1" />
      </div>
      <div class="col-sm-2" />
    </div>
  </q-header>
</template>

<style scoped>
.q-header {
  display: flex;
  flex-direction: column;
  height: 150px;
}
</style>

<script>
export default {
  name: "BaseHeader",
  computed: {
    isLogado () {
      return this.$store.getters.isLogado
    }
  },
  methods: {
    goToLogin () {
      this.$router.push("/login")
    }
  }
}
</script>