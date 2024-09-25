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
  <v-container class="fill-height">
    <v-row align="center" justify="center">
      <v-col class="text-center">
        <v-btn @click="irLibros">Libros</v-btn>
        <v-btn @click="irAutores">Autores</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<style>
.fill-height {
  height: 100vh;
}
</style>
