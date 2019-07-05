import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'

//本地测试接口ip
// Vue.prototype.apiBaseUrl = 'http://192.168.0.106';

Vue.prototype.apiBaseUrl = 'http://test.chebianjie.com';

const app = new Vue({
    ...App
})
app.$mount()
