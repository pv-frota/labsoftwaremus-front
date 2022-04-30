<template>
  <div class="fit row justify-center">

    <div class="fit column q-pa-xl " style="max-width: 30%">

      <q-form @submit="login">
        <q-input
          outlined
          dense
          class="q-my-sm"
          v-model="form.login"
          label="Login"
        />

        <q-input
          outlined
          dense
          class="q-my-sm"
          v-model="form.senha"
          label="Senha"
        />
        <q-btn label="Entrar" color="primary" type="submit" />
      </q-form>

    </div>

  </div>

</template>

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
      this.$router.push('/classificacao')
    }
  }
}
</script>
