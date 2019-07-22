import Vue from 'vue';
import App from './App.vue';
import store from './store';
import eventBus from './bus';

import '@/scss/index.scss';

Vue.config.productionTip = false;

Vue.filter('timeformat', function(time) {
  let second = time % 60; // 秒數
  let minute = Math.floor(time / 60) % 60; // 分鐘
  let hour = Math.floor(Math.floor(time / 60) / 60);
  if (second.toString().length === 1) second = '0' + second.toString();
  if (minute.toString().length === 1) minute = '0' + minute.toString();
  if (hour.toString().length === 1) hour = '0' + hour.toString();
  return `${hour}:${minute}:${second}`;
});

new Vue({
  data() {
    return {
        bus: eventBus
    };
  },
  store,
  render: h => h(App)
}).$mount('#app');
