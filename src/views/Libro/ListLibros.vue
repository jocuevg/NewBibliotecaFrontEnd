<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import instance from '@/services/api'
import type { Libro } from '@/models/Libro'
import router from '@/router'

onBeforeMount(async () => {
  libros.value.push(...(await instance.get<Libro[]>('Book/All')).data)
})

const libros = ref<Libro[]>([])
const headers = [
  {
    title: 'ID',
    key: 'id'
  },
  { title: 'Nombre', key: 'nombre' },
  { title: 'Número de páginas', key: 'numeroPaginas' },
  { title: 'Id Autor', key: 'autorId' },
  { title: 'Acciones', key: 'actions', sortable: false }
]

async function borrarLibro(libro: Libro) {
  await instance.delete<number>('Book/' + libro.id)
  libros.value.splice(
    libros.value.findIndex((item) => item.id == libro.id),
    1
  )
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
  <v-data-table :headers="headers" :items="libros" hide-default-footer color="grey">
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
.v-table {
  border-radius: inherit;
  line-height: 1.5;
  max-width: 100%;
  display: flex;
  flex-direction: column;
}
</style>
