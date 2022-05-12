<template>

  <q-header class="bg-green-6">

    <div class="q-pa-md" style="height: 80%">

        <div class="row justify-between teste">

          <div class="col-md-6">

            <div class="row items-center">

              <div class="row">
                <img
                  style="height: auto"
                  src="https://novo.ufra.edu.br/images/images/brasao-ufra-2017.png"
                />
              </div>

              <div class="col q-ml-md">
                <div class="text-h5">Museu Virtual de Entomologia</div>
                <div class="text-subtitle1">Instituto de Ciências Agrárias - ICA</div>
              </div>

            </div>

          </div>
          
          <div class="col-md-4 self-end q-gutter-sm">

            <q-btn 
              flat color = "white" 
              label="Início"
              href="/home"
            />
            
            <q-btn
              flat color = "white"  
              label="Sobre"
            />
            
            <q-btn
              flat color = "white"  
              label="Contato"
            />

            <q-btn flat color = "white"  label="Login"  v-if="!isLogado" @click="goToLogin()" />
            <q-btn-dropdown v-if="isLogado" color="primary" label="Admin">
              <q-list>
                <q-item clickable v-close-popup>
                  <q-item-section>
                    <q-item-label>Novo Inseto</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item clickable v-close-popup @click="goToTaxonomia()">
                  <q-item-section>
                    <q-item-label>Taxonomia</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item clickable v-close-popup @click="goToEspecificacao()">
                  <q-item-section>
                    <q-item-label>Especificação</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item clickable v-close-popup>
                  <q-item-section>
                    <q-item-label>Sair</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-btn-dropdown>

          </div>
      
        </div>

    </div>
  </q-header>

</template>

<style scoped>
.q-header {
  display: flex;
  flex-direction: column;
  height: 130px;
}

.teste{
  height: 100px;
}
</style>

<script>
export default {
  name: "BaseHeader",
  computed: {
    isLogado() {
      return this.$store.getters.isLogado;
    },
  },
  methods: {
    goToLogin() {
      this.$router.push("/login");
    },
    goToTaxonomia() {
      this.$router.push("/taxonomia");
    },
    goToEspecificacao() {
      this.$router.push("/especificacao");
    },
  },
};
</script>