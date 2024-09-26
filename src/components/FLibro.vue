<script setup lang="ts">
import type { Libro } from '@/models/Libro'
import type { Autor } from '@/models/Autor'

import { onBeforeMount, ref } from 'vue'
import instance from '@/services/api'
import router from '@/router'
import { useLibrosStore } from '@/stores/Libros'

onBeforeMount(async () => {
  autores.value.push(...(await instance.get<Autor[]>('Author/All')).data)
  if (!props.id) {
    titulo.value = 'Añadir libro'
    return
  }
  let libro = (await instance.get<Libro>(`Book/${props.id}`)).data
  titulo.value = 'Editar libro'
  nombre.value = libro.nombre
  anonimo.value = libro.autorId === null
  autorId.value = libro.autorId
  numeroPaginas.value = libro.numeroPaginas
})

const props = defineProps<{
  id?: number
}>()

const LibrosStore = await useLibrosStore()
const titulo = ref<string>()
const nombre = ref<string>()
const numeroPaginas = ref<number>()
const anonimo = ref(false)
const autorId = ref<number>()
const autores = ref<Autor[]>([])
const validationError = ref<string>()

async function anadirLibro() {
  await instance
    .post<number>('Book', {
      nombre: nombre.value,
      numeroPaginas: numeroPaginas.value,
      autorId: anonimo.value ? undefined : autorId.value
    })
    .then((res) => {
      LibrosStore.agregar({
        id: res.data,
        nombre: nombre.value!,
        numeroPaginas: numeroPaginas.value!,
        autorId: anonimo.value ? undefined : autorId.value
      })
      router.push('/Libros')
    })
    .catch((error) => {
      validationError.value = error.response.data.description
      return
    })
}

async function modificarLibro() {
  await instance
    .put('Book/' + props.id, {
      nombre: nombre.value,
      numeroPaginas: numeroPaginas.value,
      autorId: anonimo.value ? undefined : autorId.value
    })
    .then(() => {
      router.push('/Libros')
    })
    .catch((error) => {
      validationError.value = error.response.data.description
      return
    })
}
function cancelar() {
  router.push({
    name: 'Libros'
  })
}
</script>

<template>
  <v-card :title="titulo" style="opacity: 95%; width: 40%; align-self: center; margin-top: 10%">
    <v-card-text>
      <v-text-field label="Nombre" variant="outlined" required v-model="nombre"></v-text-field>

      <v-text-field
        label="Número de paginas"
        variant="outlined"
        type="number"
        required
        v-model="numeroPaginas"
      ></v-text-field>

      <v-checkbox v-model="anonimo" label="Anónimo"></v-checkbox>

      <template v-if="!anonimo">
        <v-select
          label="Autor"
          :items="autores"
          variant="outlined"
          v-model="autorId"
          :required="!anonimo"
          :item-title="(item: Autor) => `${item.nombre} ${item.apellidos}`"
          item-value="id"
          single-line
        ></v-select>
      </template>
    </v-card-text>
    <v-card-actions>
      <v-btn v-if="!props.id" @click="anadirLibro">Añadir libro</v-btn>
      <v-btn v-else @click="modificarLibro()">Guardar</v-btn>

      <v-btn @click="cancelar">Cancelar</v-btn>
    </v-card-actions>
  </v-card>

  <template v-if="validationError != undefined">{{ validationError }}</template>
</template>
