<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import instance from '@/services/api'
import type { Autor } from '@/models/Autor'
import router from '@/router'
import { useAutoresStore } from '@/stores/Autores'
import { storeToRefs } from 'pinia'

onBeforeMount(async () => {
  AutoresStore.loadAuthors(true)
})

const AutoresStore = useAutoresStore()
const { Lautores } = storeToRefs(AutoresStore)

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
  await instance.delete<number>('Author/' + autor.id)
  AutoresStore.quitar(autor)
}

function editarAutor(autor: Autor) {
  router.push({
    name: 'Editarautor',
    params: { id: autor.id }
  })
}
function anadirAutor() {
  router.push({
    name: 'Anadirautor'
  })
}
function irInicio() {
  router.push({
    name: 'home'
  })
}
</script>

<template>
  <v-data-table :headers="headers" :items="Lautores" hide-default-footer style="height: 100%">
    <template v-slot:top>
      <v-toolbar flat color="black">
        <v-toolbar-title>AUTORES</v-toolbar-title>
        <v-btn icon="mdi-home" @click="irInicio"></v-btn>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-btn icon="mdi-plus" @click="anadirAutor"></v-btn>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon class="me-2" size="small" @click="editarAutor(item)"> mdi-pencil </v-icon>
      <v-icon size="small" @click="borrarAutor(item)"> mdi-delete </v-icon>
    </template>
  </v-data-table>
</template>
