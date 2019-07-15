import Vue from 'vue'
import App from './App'
import $api from './api.js'
console.log($api);

Vue.config.productionTip = false

App.mpType = 'app'

Vue.prototype.api = $api;

//本地测试接口ip
// Vue.prototype.apiBaseUrl = 'http://192.168.0.106';

Vue.prototype.serviceBaseUrl = 'http://chebianjie.net:55880';

Vue.prototype.apiBaseUrl = 'http://test.chebianjie.com:4680';

Vue.prototype.getToken = (callBack = () => {}) => {
	uni.request({
		url: Vue.prototype.serviceBaseUrl + '/auth/consumer/login',
		data: {"username": "15107672996", "password": "111111"},
		method: 'POST',
		complete(res) {
			if (res.data.status === 2000000) {
				uni.setStorage({
					key: 'token',
					data: res.data.data.access_token
				});
				Vue.prototype.token = res.data.data.access_token;
				uni.request({
					url: Vue.prototype.serviceBaseUrl + '/uaa/api/getConsumerMessage',
					method: 'GET',
					header: {
						'Authorization': 'Bearer ' + res.data.data.access_token
					},
					complete(res) {
						if (res.data.status === 2000000) {
							uni.setStorage({
								key: 'userId',
								data: res.data.data.id
							});
							Vue.prototype.userId = res.data.data.id;
							Vue.prototype.userNickName = res.data.data.nickname;
							Vue.prototype.account = res.data.data.account;
							Vue.prototype.userData = res.data.data;
							callBack();
						}
					}
				})
			}
		}
	})
};

const app = new Vue({
    ...App
})
app.$mount()
