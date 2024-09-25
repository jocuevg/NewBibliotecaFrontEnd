<script setup lang="ts">
import type { Autor } from '@/models/Autor'

import { onBeforeMount, ref } from 'vue'
import instance from '@/services/api'
import router from '@/router'

onBeforeMount(async () => {
  if (!props.id) {
    return
  }
  let autor = (await instance.get<Autor>(`Author/${props.id}`)).data
  nombre.value = autor.nombre
  apellidos.value = autor.apellidos
  edad.value = autor.edad
})

const props = defineProps<{
  id?: number
}>()

const nombre = ref<string | undefined>()
const apellidos = ref<string | undefined>()
const edad = ref<number | undefined>()
const validationError = ref<string>()

async function anadirAutor() {
  await instance
    .post<number>('Author', {
      nombre: nombre.value,
      apellidos: apellidos.value,
      edad: edad.value
    })
    .then(() => {
      router.push('/Autores')
    })
    .catch((error) => {
      validationError.value = error.response.data.description
      return
    })
}

async function modificarAutor() {
  await instance
    .put('Author/' + props.id, {
      nombre: nombre.value,
      apellidos: apellidos.value,
      edad: edad.value
    })
    .then(() => {
      router.push('/Autores')
    })
    .catch((error) => {
      validationError.value = error.response.data.description
      return
    })
}
function cancelar() {
  router.push({
    name: 'Autores'
  })
}
</script>

<template>
  <v-text-field label="Nombre" variant="outlined" required v-model="nombre"></v-text-field>
  <v-text-field label="Apellidos" variant="outlined" required v-model="apellidos"></v-text-field>
  <v-text-field
    label="Edad"
    variant="outlined"
    type="number"
    required
    v-model="edad"
  ></v-text-field>
  <br />

  <v-btn v-if="!props.id" @click="anadirAutor">Añadir autor</v-btn>
  <v-btn v-else @click="modificarAutor()">Guardar</v-btn>

  <v-btn @click="cancelar">Cancelar</v-btn>

  <template v-if="validationError != undefined">{{ validationError }}</template>
</template>
