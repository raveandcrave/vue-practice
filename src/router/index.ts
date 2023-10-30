import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import MainPage from '@/pages/MainPage.vue';
import PostPage from '@/pages/PostPage.vue';
import AboutPage from '@/pages/AboutPage.vue';
import PostIdPage from '@/pages/PostIdPage.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: MainPage
  },
  {
    path: '/posts',
    component: PostPage
  },
  {
    path: '/posts/:id',
    component: PostIdPage
  },
  {
    path: '/about',
    component: AboutPage
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;
