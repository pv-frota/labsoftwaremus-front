<template>

  <q-page class="flex flex-center">

    <div class="fit row justify-center">

      <div class="column q-pa-xl" style="max-width: 40%">

        <q-form @submit="login">

          <div class="form-group">

            <div class="form-input" style="max-width: 90%">

              <p>Acesso Administrativo</p>

              <q-input
                filled
                dense
                class="q-my-sm"
                v-model="form.login"
                label="Login"
              />

              <q-input
                filled
                dense
                class="q-my-sm"
                v-model="form.senha"
                label="Senha"
              />
              <q-btn class="q-my-md" label="Entrar" color="positive" type="submit" />

            </div>

          </div>

        </q-form>

      </div>

    </div>
    
  </q-page>

</template>

<style scoped>

.form-group {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 300px;
  background-color: lightcyan;
  border-radius: 25px;
}

.form-input{
  text-align: center;
}
</style>

<script>
export default {
  name: 'LoginView',
  data () {
    return {
      form: {
        login: "",
        senha: "",
      },
    };
  },
  methods: {
    async login () {
      const response = await this.$services
        .auth()
        .login(this.form.login, this.form.senha)
      this.$store.commit('setUsuario', response.data);
      this.$router.push('/')
    }
  }
}
</script>
