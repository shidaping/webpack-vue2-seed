import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './app';
import router from './router';
// if (module.hot) 
//     module.hot.accept();

Vue.use(VueRouter);

const todo = new Vue({
  el: '#app',
  data: {
    msg: 'hello, world',
  },
  router,
  render: h => h(App),
})

