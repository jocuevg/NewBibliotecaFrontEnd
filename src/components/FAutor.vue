<script setup lang="ts">
import type { Autor } from '@/models/Autor'
import { useAutor } from '@/componsables/Autor'
import { computed, ref } from 'vue'

const { agregar, modificar } = useAutor()
const titulo = ref<string>()
const nombre = ref<string | undefined>()
const apellidos = ref<string | undefined>()
const edad = ref<number | undefined>()
const id = ref<number>()
const validationError = ref<string | undefined>()
const dialog = ref(false)
const completo = computed(() => !!nombre.value && !!apellidos.value && !!edad.value)

function showDialog(autor?: Autor) {
  titulo.value = autor ? 'Editar autor' : 'Añadir autor'
  nombre.value = autor?.nombre
  apellidos.value = autor?.apellidos
  edad.value = autor?.edad
  id.value = autor?.id
  dialog.value = true
}

async function anadirAutor() {
  var res = await agregar({
    nombre: nombre.value!,
    apellidos: apellidos.value!,
    edad: edad.value!
  })
  if (res) {
    validationError.value = res
    return
  }
  dialog.value = false
}

async function modificarAutor() {
  var res = await modificar({
    id: id.value!,
    nombre: nombre.value!,
    apellidos: apellidos.value!,
    edad: edad.value!
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
          label="Apellidos"
          variant="outlined"
          :rules="[required]"
          v-model="apellidos"
        ></v-text-field>
        <v-text-field
          label="Edad"
          variant="outlined"
          type="number"
          :rules="[required]"
          v-model="edad"
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <p style="white-space: pre-line; color: red" v-if="validationError != undefined">
          {{ validationError }}
        </p>
        <v-btn
          v-if="!id"
          @click="anadirAutor"
          color="success"
          variant="elevated"
          :disabled="!completo"
          >Añadir autor</v-btn
        >
        <v-btn
          v-else
          @click="modificarAutor"
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
