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
  <v-btn @click="irInicio">Inicio</v-btn>
  <br />
  <v-data-table :headers="headers" :items="libros" hide-default-footer>
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>LIBROS</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-btn class="mb-2" color="primary" dark @click="anadirLibro"> Añadir libro </v-btn>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon class="me-2" size="small" @click="editarLibro(item)"> mdi-pencil </v-icon>
      <v-icon size="small" @click="borrarLibro(item)"> mdi-delete </v-icon>
    </template>
  </v-data-table>
</template>
