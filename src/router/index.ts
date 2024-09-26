import { createRouter, createWebHistory } from 'vue-router'
import ListLibros from '../views/Libro/ListLibros.vue'
import Autores from '../views/Autor/ListAutores.vue'
import FLibro from '@/components/FLibro.vue'
import PPrincipal from '../views/PPrincipal.vue'
import FAutor from '@/components/FAutor.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: PPrincipal
    },
    {
      path: '/Libros',
      name: 'Libros',
      component: ListLibros
    },
    {
      path: '/Autores',
      name: 'Autores',
      component: Autores
    },
    {
      path: '/Libros/Agregar',
      name: 'Anadirlibro',
      component: FLibro
    },
    {
      path: '/Libros/Editar/:id(\\d+)',
      name: 'Editarlibro',
      component: FLibro,
      props: (route) => ({
        id: Number((route.params as any).id)
      })
    },
    {
      path: '/Autores/Agregar',
      name: 'Anadirautor',
      component: FAutor
    },
    {
      path: '/Autores/Editar/:id(\\d+)',
      name: 'Editarautor',
      component: FAutor,
      props: (route) => ({
        id: Number((route.params as any).id)
      })
    }
  ]
})

export default router
