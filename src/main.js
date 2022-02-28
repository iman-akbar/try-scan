import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import VueQrcodeReader from "vue-qrcode-reader";
import DatetimePicker from 'vuetify-datetime-picker'
import EasyCamera from 'easy-vue-camera';

Vue.use(EasyCamera);
Vue.use(VueQrcodeReader);
Vue.use(DatetimePicker)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
