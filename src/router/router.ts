import {createRouter, createWebHistory} from "vue-router";
import MainPage from '@/Pages/MainPage.vue'
import PostsPage from '@/Pages/PostsPage.vue'
import AboutPage from '@/Pages/AboutPage.vue'
import PostPage from '@/Pages/PostPage.vue'

const routes = [
  {
    path: '/',
    component: MainPage
  },
  {
    path: '/posts',
    component: PostsPage
  },
  {
    path: '/about',
    component: AboutPage
  },
  {
    path: '/post/:postId',
    component: PostPage
  }
]

export const router = createRouter({
  routes,
  history: createWebHistory()
})

