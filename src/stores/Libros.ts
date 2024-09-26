import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Libro } from '@/models/Libro'
import instance from '@/services/api'

export const useLibrosStore = defineStore('Libros', async () => {
  const Llibros = ref<Libro[]>((await instance.get<Libro[]>('Book/All')).data)

  function agregar(libro: Libro) {}

  return { Llibros, agregar }
})
