<script setup lang="ts">
import type { Libro } from '@/models/Libro'
import type { Autor } from '@/models/Autor'

import { computed, ref } from 'vue'
import { useLibro } from '@/componsables/Libro'
import { useAutor } from '@/componsables/Autor'

const { agregar, modificar } = useLibro()
const { autores, loadAuthors } = useAutor()
const id = ref<number>()
const titulo = ref<string>()
const nombre = ref<string>()
const numeroPaginas = ref<number>()
const anonimo = ref(false)
const autorId = ref<number>()
const validationError = ref<string | undefined>()
const dialog = ref(false)
const completo = computed(
  () => !!nombre.value && !!numeroPaginas.value && (anonimo.value || !!autorId.value)
)

function showDialog(libro?: Libro) {
  loadAuthors()
  titulo.value = libro ? 'Editar libro' : 'Añadir libro'
  nombre.value = libro?.nombre
  numeroPaginas.value = libro?.numeroPaginas
  anonimo.value = libro?.autorId === null
  autorId.value = libro?.autorId
  id.value = libro?.id
  dialog.value = true
  validationError.value = undefined
}

async function anadirLibro() {
  var res = await agregar({
    nombre: nombre.value!,
    numeroPaginas: numeroPaginas.value!,
    autorId: anonimo.value ? undefined : autorId.value
  })
  if (res) {
    validationError.value = res
    return
  }
  dialog.value = false
}

async function modificarLibro() {
  var res = await modificar({
    id: id.value!,
    nombre: nombre.value!,
    numeroPaginas: numeroPaginas.value!,
    autorId: anonimo.value ? undefined : autorId.value
  })
  if (res) {
    validationError.value = res
    return
  }
  dialog.value = false
}

function required(v: string) {
  return !!v || 'Campo obligatorio'
}
function requiredAutor(v: string) {
  return anonimo.value || !!v || 'Campo obligatorio'
}

defineExpose({
  showDialog
})
</script>

<template>
  <v-dialog v-model="dialog" persistent>
    <v-card :title="titulo" style="width: 30%; align-self: center">
      <v-card-text>
        <v-text-field
          label="Nombre"
          variant="outlined"
          :rules="[required]"
          v-model="nombre"
        ></v-text-field>

        <v-text-field
          label="Número de paginas"
          variant="outlined"
          type="number"
          :rules="[required]"
          v-model="numeroPaginas"
        ></v-text-field>

        <v-checkbox v-model="anonimo" label="Anónimo"></v-checkbox>

        <template v-if="!anonimo">
          <v-select
            label="Autor"
            :items="autores"
            variant="outlined"
            v-model="autorId"
            :rules="[requiredAutor]"
            :item-title="(item: Autor) => `${item.nombre} ${item.apellidos}, ${item.edad} años`"
            item-value="id"
            single-line
            clearable
          ></v-select>
        </template>
      </v-card-text>
      <v-card-actions>
        <p style="white-space: pre-line; color: red" v-if="validationError != undefined">
          {{ validationError }}
        </p>

        <v-btn
          v-if="!id"
          @click="anadirLibro"
          color="success"
          variant="elevated"
          :disabled="!completo"
          >Añadir libro</v-btn
        >
        <v-btn
          v-else
          @click="modificarLibro"
          color="success"
          variant="elevated"
          :disabled="!completo"
          >Guardar</v-btn
        >

        <v-btn @click="dialog = false" color="error" variant="elevated">Cancelar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
