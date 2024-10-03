import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Autor } from '@/models/Autor'

export const useAutoresStore = defineStore('Autores', () => {
  const Lautores = ref<Autor[]>([])

  function getAutor(id: number): Autor {
    return Lautores.value.find((item) => item.id == id)!
  }

  async function loadAuthors(autores: Autor[]) {
    Lautores.value = autores
  }

  function quitar(autor: Autor) {
    Lautores.value.splice(
      Lautores.value.findIndex((item) => item.id == autor.id),
      1
    )
  }

  return { Lautores, quitar, loadAuthors, getAutor }
})
