import '@fortawesome/fontawesome-free/css/all.css';
import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import { VSnackbarsProps } from '@/types';

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  data () {
    return {
      loading: true,
      systemMessage: {},
      online:  navigator.onLine
    }
  },
  methods: {
    toggleLoading () {
      this.loading = !this.loading;
    },
    setSystemMessage(props: VSnackbarsProps) {
      props.show = true;
      this.systemMessage = props;
    }
  },
  render: h => h(App)
}).$mount('#app')
