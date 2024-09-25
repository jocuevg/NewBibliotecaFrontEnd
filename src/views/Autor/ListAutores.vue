<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import instance from '@/services/api'
import type { Autor } from '@/models/Autor'
import router from '@/router'

onBeforeMount(async () => {
  autores.value.push(...(await instance.get<Autor[]>('Author/All')).data)
})

const autores = ref<Autor[]>([])
const headers = [
  {
    title: 'ID',
    key: 'id'
  },
  { title: 'Nombre', key: 'nombre' },
  { title: 'Apellidos', key: 'apellidos' },
  { title: 'Edad', key: 'edad' },
  { title: 'Acciones', key: 'actions', sortable: false }
]

async function borrarAutor(autor: Autor) {
  await instance.delete<number>('Author/' + autor.id)
  autores.value.splice(
    autores.value.findIndex((item) => item.id == autor.id),
    1
  )
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
  <v-btn @click="irInicio">Inicio</v-btn>

  <br />

  <v-data-table :headers="headers" :items="autores" hide-default-footer>
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>AUTORES</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-btn class="mb-2" color="primary" dark @click="anadirAutor"> Añadir autor </v-btn>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon class="me-2" size="small" @click="editarAutor(item)"> mdi-pencil </v-icon>
      <v-icon size="small" @click="borrarAutor(item)"> mdi-delete </v-icon>
    </template>
  </v-data-table>
</template>
