import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Autor } from '@/models/Autor'
import instance from '@/services/api'

export const useAutoresStore = defineStore('Autores', () => {
  const Lautores = ref<Autor[]>([])

  function getAutor(id: number): Autor {
    return Lautores.value.find((item) => item.id == id)!
  }

  async function loadAuthors(forceRefresh: boolean = false) {
    if (Lautores.value.length > 0 && !forceRefresh) {
      return
    }
    Lautores.value = (await instance.get<Autor[]>('Author/All')).data
  }

  function quitar(autor: Autor) {
    Lautores.value.splice(
      Lautores.value.findIndex((item) => item.id == autor.id),
      1
    )
  }

  return { Lautores, quitar, loadAuthors, getAutor }
})
