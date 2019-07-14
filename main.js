import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'

//本地测试接口ip
// Vue.prototype.apiBaseUrl = 'http://192.168.0.106';

Vue.prototype.serviceBaseUrl = 'http://chebianjie.net:55880';

//全局token
// uni.setStorage({
// 	key: 'token',
// 	data: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiIxNTEwNzY3Mjk5NjpDT05TVU1FUiIsInNjb3BlIjpbIm9wZW5pZCJdLCJleHAiOjE1NjI1MTcwNTcsImlhdCI6MTU2MjUwOTg1NywiYXV0aG9yaXRpZXMiOlsiVXNlciJdLCJqdGkiOiIzZmM1NWNlMS03NzYyLTRmMmQtYjg4NS1iNzU5ODJmNTk1MDAiLCJjbGllbnRfaWQiOiJ3ZWJfYXBwIn0.hQ4U3VlcfTsDI7y_j93tSDE01YsbvG4hS5UpRHup2JcxxM7PRQfnT61RoaXguBs4osPbPVZozG1poOb0D9qVXj6IZAyFermJUQvOb4nSNY9hIqkovOPv6S-iOGZhPHEETUi0CFwPECCG5RUY4sIQS6-_hOiC1dkcphOUwGa3hc-uCd2w4CeZRVRL0tfGg60wQGeQfXm2RSwpb6VCa5KKpGwjr2C4Tm69GzcLmSzFoZMXSUD8rsqTk8OObKseixMkNKNQAvjzgMqPgHaOIkgq6SNjD38GxcvuQQGxWBmOjvC4H49-od9sOUlRGjgipiq_hFaXBhPbPaWhGNNrHiKF4A'
// })

// uni.getStorage({
// 	key: 'token',
// 	complete(res) {
// 		if (res.data === '') {
// 			uni.showModal({
// 				content: '请登录用户'
// 			});
// 			Vue.prototype.token = ''
// 		} else {
// 			console.log(res.data)
// 			Vue.prototype.token = res.data;
// 			uni.request({
// 				url: Vue.prototype.serviceBaseUrl + '/uaa/api/ut-consumers/findByAccountFromApp',
// 				method: 'POST',
// 				data: {}
// 			});
// 		}
// 	}
// })

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
