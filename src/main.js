import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/axios'

/* Bootstrap-vue */
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
//import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue)

/* vue-tables-2 */
import VueTables from 'vue-tables-2';
//Vue.use(VueTables.ClientTable);
Vue.use(VueTables.ClientTable);//, [options = {}], [useVuex = false], [theme = 'bootstrap'], [template = 'default']);


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
