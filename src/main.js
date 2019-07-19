import Vue from 'vue';
import App from './App.vue';
import store from './store';
import eventBus from './bus';

import '@/scss/index.scss';

Vue.config.productionTip = false;

new Vue({
  data() {
    return {
        bus: eventBus
    };
  },
  store,
  render: h => h(App)
}).$mount('#app');
