import type { Autor } from '@/models/Autor'
import type { CreateAutor } from '@/models/CreateAutor'
import instance from '@/services/api'
import { useAutoresStore } from '@/stores/Autores'
import { storeToRefs } from 'pinia'

export const useAutor = () => {
  const AutorStore = useAutoresStore()
  const { Lautores } = storeToRefs(AutorStore)

  function getAutorById(id: number): Autor {
    return AutorStore.getAutor(id)
  }

  async function loadAuthors(forceRefresh: boolean = false) {
    if (Lautores.value.length > 0 && !forceRefresh) {
      return
    }
    AutorStore.loadAuthors((await instance.get<Autor[]>('Author/All')).data)
  }

  async function quitar(autor: Autor) {
    await instance.delete<number>('Author/' + autor.id)
    AutorStore.quitar(autor)
  }

  async function agregar(autor: CreateAutor): Promise<string | undefined> {
    let errors: string | undefined = undefined
    await instance
      .post<number>('Author', {
        nombre: autor.nombre,
        apellidos: autor.apellidos,
        edad: autor.edad
      })
      .then((response) => {
        Lautores.value.push({
          id: response.data,
          nombre: autor.nombre,
          apellidos: autor.apellidos,
          edad: autor.edad
        })
        return undefined
      })
      .catch((error) => {
        errors = error.response.data.description
      })
    return errors
  }

  async function modificar(autor: Autor): Promise<string | undefined> {
    let errors: string | undefined = undefined
    await instance
      .put('Author/' + autor.id, {
        nombre: autor.nombre,
        apellidos: autor.apellidos,
        edad: autor.edad
      })
      .then(() => {
        const autorAEditar: Autor = Lautores.value.find((item) => item.id == autor.id)!
        autorAEditar.nombre = autor.nombre
        autorAEditar.apellidos = autor.apellidos
        autorAEditar.edad = autor.edad
        return undefined
      })
      .catch((error) => {
        errors = error.response.data.description
      })
    return errors
  }

  return { autores: Lautores, getAutorById, loadAuthors, quitar, agregar, modificar }
}
