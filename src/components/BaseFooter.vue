<template>

  <q-footer class="bg-green-6">

    <div class="fit row justify-center">

      <div class="col-lg-6 self-center">

        <div class="row justify-evenly">

          <q-btn
            class="q-my-sm"
            icon="facebook"
            href="https://www.facebook.com"
            dense
            unelevated
          />

          <q-btn
            class="q-my-sm"
            icon="facebook"
            href="https://www.facebook.com"
            dense
            unelevated
          />

          <q-btn
            class="q-my-sm"
            icon="facebook"
            href="https://www.facebook.com"
            dense
            unelevated
          />

        </div>

        <p>&copy; Instituto de Ciências Agrárias. Todos os direitos reservados.</p>
      </div>

    </div>
  </q-footer>

</template>

<style scoped>
.q-footer {
  position:static;
  display: flex;
  flex-direction: column;
  height: 85px;
  margin: 0;
}
</style>




<script>

export default {
  name: "BaseFooter",
}

</script>