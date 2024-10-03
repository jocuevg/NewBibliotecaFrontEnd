import { createRouter, createWebHistory } from 'vue-router'
import ListLibros from '../views/Libro/ListLibros.vue'
import Autores from '../views/Autor/ListAutores.vue'
import PPrincipal from '../views/PPrincipal.vue'

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
    }
  ]
})

export default router
