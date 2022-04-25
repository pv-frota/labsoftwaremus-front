<template>
  <q-page class="flex flex-center">
    <q-form @submit="login">
      <q-input
        outlined dense
        class="col-md-12 col-sm-12 col-xl-8"
        v-model="form.login"
        label="Login"
      />
      <q-input
        outlined dense
        class="col-md-12 col-sm-12 col-xl-8"
        v-model="form.senha"
        label="Senha"
      />
      <q-btn label="Entrar" color="primary" type="submit" />
    </q-form>
  </q-page>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      form: {
        login: '',
        senha: ''
      }
    }
  },
  methods: {
    async login () {
      const response = await this.$services.auth().login(this.form.login, this.form.senha)
      console.log(response.data)
      this.$store.commit('setUsuario', response.data);
      this.$router.push('/about')
    }
  }
}
</script>
