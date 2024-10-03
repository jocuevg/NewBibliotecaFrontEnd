import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Libro } from '@/models/Libro'

export const useLibrosStore = defineStore('Libros', () => {
  const Llibros = ref<Libro[]>([])

  function getLibro(id: number): Libro {
    return Llibros.value.find((item) => item.id == id)!
  }

  async function loadBooks(libros: Libro[]) {
    Llibros.value = libros
  }

  function quitar(libro: Libro) {
    Llibros.value.splice(
      Llibros.value.findIndex((item) => item.id == libro.id),
      1
    )
  }

  return { Llibros, quitar, loadBooks, getLibro }
})
