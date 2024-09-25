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
  <v-btn @click="irLibros">Libros</v-btn>
  <v-btn @click="irAutores">Autores</v-btn>
</template>
