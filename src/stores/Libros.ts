import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Libro } from '@/models/Libro'
import instance from '@/services/api'

export const useLibrosStore = defineStore('Libros', () => {
  const Llibros = ref<Libro[]>([])

  function getLibro(id: number): Libro {
    return Llibros.value.find((item) => item.id == id)!
  }

  async function loadBooks(forceRefresh: boolean = false) {
    if (Llibros.value.length > 0 && !forceRefresh) {
      return
    }
    Llibros.value = (await instance.get<Libro[]>('Book/All')).data
  }

  function quitar(libro: Libro) {
    Llibros.value.splice(
      Llibros.value.findIndex((item) => item.id == libro.id),
      1
    )
  }

  return { Llibros, quitar, loadBooks, getLibro }
})
