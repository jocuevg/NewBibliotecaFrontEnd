<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <v-app class="gris">
    <RouterView />
  </v-app>
</template>

<style>
.gris {
  background-color: rgb(212, 211, 211);

  min-height: 100vh; /* Asegura que el fondo cubra toda la pantalla */
}
</style>
