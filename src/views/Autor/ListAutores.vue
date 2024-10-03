<script setup lang="ts">
import { onBeforeMount, useTemplateRef } from 'vue'
import type { Autor } from '@/models/Autor'
import router from '@/router'
import FAutor from '@/components/FAutor.vue'
import { useAutor } from '@/componsables/Autor'

onBeforeMount(async () => {
  loadAuthors(true)
})

const { autores, loadAuthors, quitar } = useAutor()
const autorDialog = useTemplateRef('autorDialog')

const headers = [
  {
    title: 'ID',
    key: 'id',
    align: 'center'
  },
  { title: 'Nombre', key: 'nombre', align: 'center' },
  { title: 'Apellidos', key: 'apellidos', align: 'center' },
  { title: 'Edad', key: 'edad', align: 'center' },
  { title: 'Acciones', key: 'actions', sortable: false, align: 'center' }
]

async function borrarAutor(autor: Autor) {
  quitar(autor)
}

function editarAutor(autor: Autor) {
  autorDialog.value?.showDialog(autor)
}
function anadirAutor() {
  autorDialog.value?.showDialog()
}
function irInicio() {
  router.push({
    name: 'home'
  })
}
</script>

<template>
  <v-data-table :headers="headers" :items="autores" style="height: 100%">
    <template v-slot:top>
      <v-toolbar flat color="black">
        <v-toolbar-title>AUTORES</v-toolbar-title>
        <v-btn icon="mdi-home" @click="irInicio"></v-btn>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-btn icon="mdi-plus" @click="anadirAutor()"></v-btn>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon class="me-2" size="small" @click="editarAutor(item)"> mdi-pencil </v-icon>
      <!-- editarAutor(item) -->
      <v-icon size="small" @click="borrarAutor(item)"> mdi-delete </v-icon>
    </template>
  </v-data-table>
  <FAutor ref="autorDialog"></FAutor>
</template>
