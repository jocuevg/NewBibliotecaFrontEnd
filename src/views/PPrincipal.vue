<script setup lang="ts">
import router from '@/router'

function irLibros() {
  router.push({
    name: 'Libros'
  })
}
function irAutores() {
  router.push({
    name: 'Autores'
  })
}
</script>

<template>
  <div class="fondo">
    <v-container class="fill-height">
      <v-row align="center" justify="center">
        <v-col class="text-center">
          <v-btn @click="irLibros" rounded="xl" size="x-large" style="width: 15%; margin: 10px"
            >Libros</v-btn
          >

          <v-btn @click="irAutores" rounded="xl" size="x-large" style="width: 15%; margin: 10px"
            >Autores</v-btn
          >
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style>
.fill-height {
  height: 100vh;
}
.fondo {
  background-image: url('@/images/fondo.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 100vh;
}
</style>
