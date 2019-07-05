import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'

//本地测试接口ip
Vue.prototype.apiBaseUrl = 'http://192.168.0.106';

//全局token
uni.setStorage({
	key: 'token',
	data: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiIxNTEwNzY3Mjk5NjpDT05TVU1FUiIsInNjb3BlIjpbIm9wZW5pZCJdLCJleHAiOjE1NjIzMjY3MDgsImlhdCI6MTU2MjMxOTUwOCwiYXV0aG9yaXRpZXMiOlsiVXNlciJdLCJqdGkiOiI4N2EyNzAwNS00NDA1LTQyZDEtOWZiNy04M2JhY2NkZjA4OTYiLCJjbGllbnRfaWQiOiJ3ZWJfYXBwIn0.gWSxMUFkhaV_6Apev7U-1wVbZRq5Y9SxPtRUKC4O10n9cARhZ5fcIdt9w_vhMJ-NTgJ2-5cQBVw-jmjopECBlqKe6q68nG1QmK3Wk_fN5ONU6uv1FTsntPNN2VdBTvNc19hRkXtZXUqeymE4DYtUwF-Rhw4o1MiCXrlEIzYBpnAwJNT-mexnDQgCtNSXhG5uDrDK_4U9v8baUnxuo4Zz5Vqq1xZcEHLkffvGjTR9DzXK_modnnpL-TqSkIVosPgh02_7hMgm_6rtWCOXqrBuyLj9tnZMDXhn5wVsOieh7hponsq9B4orZPFjAAMZ2yJuymH76GyRG09Y0PPZM8d8Ww'
})

uni.getStorage({
	key: 'token',
	complete(res) {
		if (res.data === '') {
			uni.showModal({
				content: '请登录用户'
			});
			Vue.prototype.token = ''
		} else {
			console.log(res.data)
			Vue.prototype.token = res.data;
			uni.request({
				url: 'http://chebianjie.net:55880/uaa/api/ut-consumers/findByAccountFromApp',
				method: 'POST',
				data: {}
			});
		}
	}
})

// Vue.prototype.apiBaseUrl = 'http://test.chebianjie.com:4680';

const app = new Vue({
    ...App
})
app.$mount()
