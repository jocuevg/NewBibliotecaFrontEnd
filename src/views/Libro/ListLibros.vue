<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import instance from '@/services/api'
import type { Libro } from '@/models/Libro'
import router from '@/router'
import { useLibrosStore } from '@/stores/Libros'
import { storeToRefs } from 'pinia'

onBeforeMount(async () => {
  await LibrosStore.loadBooks(true)
})

const LibrosStore = useLibrosStore()
const { Llibros } = storeToRefs(LibrosStore)

const headers = [
  {
    title: 'ID',
    key: 'id',
    align: 'center'
  },
  { title: 'Nombre', key: 'nombre', align: 'center' },
  { title: 'Número de páginas', key: 'numeroPaginas', align: 'center' },
  { title: 'Id Autor', key: 'autorId', align: 'center' },
  { title: 'Acciones', key: 'actions', sortable: false, align: 'center' }
]

async function borrarLibro(libro: Libro) {
  await instance.delete<number>('Book/' + libro.id)
  LibrosStore.quitar(libro)
}

function editarLibro(libro: Libro) {
  router.push({
    name: 'Editarlibro',
    params: { id: libro.id }
  })
}
function anadirLibro() {
  router.push({
    name: 'Anadirlibro'
  })
}
function irInicio() {
  router.push({
    name: 'home'
  })
}
</script>

<template>
  <v-data-table :headers="headers" :items="Llibros" hide-default-footer style="height: 100%">
    <template v-slot:top>
      <v-toolbar flat color="black">
        <v-toolbar-title>LIBROS</v-toolbar-title>
        <v-btn icon="mdi-home" @click="irInicio"></v-btn>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-btn icon="mdi-plus" @click="anadirLibro"></v-btn>
      </v-toolbar>
    </template>

    <template v-slot:item.actions="{ item }">
      <v-icon class="me-2" size="small" @click="editarLibro(item)"> mdi-pencil </v-icon>
      <v-icon size="small" @click="borrarLibro(item)"> mdi-delete </v-icon>
    </template>
  </v-data-table>
</template>

<style>
.v-data-table-header__content {
  display: flex;
  align-items: center;
  font-weight: 800;
}
</style>
