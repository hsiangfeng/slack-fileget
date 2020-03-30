import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/Home.vue'),
  },
  {
    path: '/channels',
    name: 'channels',
    component: () => import('../views/Channels.vue'),
    meta: { requiresAuth: true },
  },
];

const router = new VueRouter({
  routes,
});

export default router;
