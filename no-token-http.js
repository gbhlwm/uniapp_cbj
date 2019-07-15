import Fly from 'flyio/dist/npm/wx';

/*
 * Features:
 * 1/ 实现基本的ajax请求
 * 2/ 接口使用Promise
 * 3/ 请求前需要先有token和refresh_token，否则要先发起请求更新
 * 4/ 请求失败401要尝试刷新token
 * 4/ 没有token就要清理refresh_token，重定向到登录页面
 * 5/ token请求401，直接将token清理
 */

const $http = new Fly();

// $http.config.baseURL = baseUrl;
// 
// $http.interceptors.request.use(function(request) {
//   let headers = {
//     'Content-Type': 'application/json;charset=UTF-8'
//   };
//   request.headers = headers;
//   return request;
// });

$http.interceptors.response.use(
  res => {
    return res;
  },
  error => {
    if (error.status === 0 || error.status === 1) {
      uni.showToast({
        title: '网络异常',
        duration: 2000,
        icon: 'none'
      });
      return error;
    }
    uni.showToast({
      title: `服务器异常(${error.status})`,
      duration: 2000,
      icon: 'none'
    });
    return error;
  }
);

export default $http;
