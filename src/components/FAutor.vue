<script setup lang="ts">
import type { Autor } from '@/models/Autor'

import { onBeforeMount, ref } from 'vue'
import instance from '@/services/api'
import router from '@/router'

onBeforeMount(async () => {
  if (!props.id) {
    titulo.value = 'Añadir autor'
    return
  }
  let autor = (await instance.get<Autor>(`Author/${props.id}`)).data
  titulo.value = 'Editar autor'
  nombre.value = autor.nombre
  apellidos.value = autor.apellidos
  edad.value = autor.edad
})

const props = defineProps<{
  id?: number
}>()

const titulo = ref<string>()
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
  <div class="agregar-background">
    <v-card :title="titulo" style="opacity: 95%; width: 40%; margin-left: 30%; margin-top: 10%">
      <v-card-text>
        <v-text-field label="Nombre" variant="outlined" required v-model="nombre"></v-text-field>
        <v-text-field
          label="Apellidos"
          variant="outlined"
          required
          v-model="apellidos"
        ></v-text-field>
        <v-text-field
          label="Edad"
          variant="outlined"
          type="number"
          required
          v-model="edad"
        ></v-text-field>
      </v-card-text>
      <v-card-actions
        ><v-btn v-if="!props.id" @click="anadirAutor">Añadir autor</v-btn>
        <v-btn v-else @click="modificarAutor()">Guardar</v-btn>

        <v-btn @click="cancelar">Cancelar</v-btn></v-card-actions
      >
    </v-card>
    <template v-if="validationError != undefined">{{ validationError }}</template>
  </div>
</template>
