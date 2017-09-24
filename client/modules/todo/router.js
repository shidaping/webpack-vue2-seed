import VueRouter from 'vue-router';
import Detail from './pages/detail';
import List from './pages/list';

const router = new VueRouter({
  mode: 'history',
  // base: __dirname,
  routes: [
    { path: '/todo/list', component: List, name: 'list' },
    { path: '/todo/detail', component: Detail, name: 'detail' },
    { path: '/todo', component: List },
    { path: '/todo/*', component: List },
  ],
});

export default router;
