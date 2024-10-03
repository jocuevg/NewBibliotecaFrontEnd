import type { CreateLibro } from '@/models/CreateLibro'
import type { Libro } from '@/models/Libro'
import instance from '@/services/api'
import { useLibrosStore } from '@/stores/Libros'
import { storeToRefs } from 'pinia'

export const useLibro = () => {
  const LibroStore = useLibrosStore()
  const { Llibros } = storeToRefs(LibroStore)

  function getLibroById(id: number): Libro {
    return LibroStore.getLibro(id)
  }

  async function loadBooks(forceRefresh: boolean = false) {
    if (Llibros.value.length > 0 && !forceRefresh) {
      return
    }
    LibroStore.loadBooks((await instance.get<Libro[]>('Book/All')).data)
  }

  async function quitar(libro: Libro) {
    await instance.delete<number>('Book/' + libro.id)
    LibroStore.quitar(libro)
  }

  async function agregar(libro: CreateLibro): Promise<string | undefined> {
    let errors: string | undefined = undefined
    await instance
      .post<number>('Book', {
        nombre: libro.nombre,
        numeroPaginas: libro.numeroPaginas,
        autorId: libro.autorId
      })
      .then((response) => {
        Llibros.value.push({
          id: response.data,
          nombre: libro.nombre,
          numeroPaginas: libro.numeroPaginas,
          autorId: libro.autorId
        })
        return undefined
      })
      .catch((error) => {
        errors = error.response.data.description
      })
    return errors
  }

  async function modificar(libro: Libro): Promise<string | undefined> {
    let errors: string | undefined = undefined
    await instance
      .put('Book/' + libro.id, {
        nombre: libro.nombre,
        numeroPaginas: libro.numeroPaginas,
        autorId: libro.autorId
      })
      .then(() => {
        const libroAEditar = Llibros.value.find((item) => item.id == libro.id)!
        libroAEditar.nombre = libro.nombre
        libroAEditar.numeroPaginas = libro.numeroPaginas
        libroAEditar.autorId = libro.autorId
      })
      .catch((error) => {
        errors = error.response.data.description
      })
    return errors
  }

  return { libros: Llibros, getLibroById, loadBooks, quitar, agregar, modificar }
}
