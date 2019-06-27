import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'

Vue.prototype.apiBaseUrl = 'http://192.168.0.106';

const app = new Vue({
    ...App
})
app.$mount()
