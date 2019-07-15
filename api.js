import $http from './no-token-http.js';

const shopRequestOption = {
	baseURL: 'http://test.chebianjie.com:4680'
};

const serviceRequestOption = {
	baseURL: 'http://chebianjie.net:55880'
};

/**
 * 查询首页轮播图
 * @param {*} pageNumber 页码
 * @param {*} pageSize 页大小
 */
export const apiOrderFindAdvertisement = data => {
  return $http.get(`/api-order/api/app/advertisement/findAdvertisement`, data, shopRequestOption).then(res => res).catch(error => error);
};

/**
 * 查询门店列表
 */
export const apiGoodFindShopByParam = data => {
  return $http.get(`/api-good/api/app/shop/findShopByParam`, data, shopRequestOption).then(res => res).catch(error => error);
};

/**
 * 获取地区
 */
export const apiGoodFindAllCityDetail = data => {
  return $http.get(`/api-good/api/app/shop/findAllCityDetail`, data, shopRequestOption).then(res => res).catch(error => error);
};

/**
 * 根据城市名获取城市id
 */
export const apiGoodFindCityByName = data => {
  return $http.get(`/api-good/api/app/shop/findCityByName`, data, shopRequestOption).then(res => res).catch(error => error);
};

/**
 * 获取服务分类列表
 */
export const apiGoodReturnServiceClassify = () => {
  return $http.get(`/api/app/shop/returnServiceClassify`, {}, shopRequestOption).then(res => res).catch(error => error);
};

/**
 * 获取服务认证列表
 */
export const apiGoodReturnShopClassify = () => {
  return $http.get(`/api-good/api/app/shop/returnShopClassify`, {}, shopRequestOption).then(res => res).catch(error => error);
};

/**
 * 获取所有城市
 */
export const apiGoodFindAllCity = () => {
  return $http.get(`/api-good/api/app/shop/findAllCity`, {}, shopRequestOption).then(res => res).catch(error => error);
};

/**
 * 获取门店详情
 */
export const apiGoodFindShopDetail = data => {
  return $http.get(`/api-good/api/app/shop/findShopDetail`, data, shopRequestOption).then(res => res).catch(error => error);
};

/**
 * 获取门店详情
 */
export const apiGoodFindServicesById = data => {
  return $http.get(`/api-good/api/app/services/findServicesById`, data, shopRequestOption).then(res => res).catch(error => error);
};

/**
 * 获取商家门店详情
 */
export const apiGoodEditShop = data => {
  return $http.get(`/api-good/api/app/shop/editShop`, data, shopRequestOption).then(res => res).catch(error => error);
};

/**
 * 更新商家门店详情
 */
export const apiGoodUpdateShop = data => {
  shopRequestOption.headers = {
  	  'content-type': 'application/x-www-form-urlencoded'
  }
  return $http.post(`/api-good/api/app/shop/updateShop`, data, shopRequestOption).then(res => res).catch(error => error);
};

/**
 * 获取服务详情
 */
export const apiGoodFindUserServiceDetail = data => {
  return $http.get(`/api-good/api/app/services/findUserServiceDetail`, data, shopRequestOption).then(res => res).catch(error => error);
};

/**
 * 保存服务
 */
export const apiGoodSaveService = (shopId, data) => {
  return $http.put(`/api-good/api/app/services/saveService?shopId=${shopId}`, data, shopRequestOption).then(res => res).catch(error => error);
};

/**
 * 更新服务
 */
export const apiGoodUpdateService = (data) => {
	shopRequestOption.headers = {
		  'content-type': 'application/x-www-form-urlencoded'
	}
  return $http.post(`/api-good/api/app/services/updateService`, data, shopRequestOption).then(res => res).catch(error => error);
};

/**
 * 获取商家服务列表
 */
export const apiGoodFindUserServiceList = data => {
  return $http.get(`/api-good/api/app/services/findUserServiceList`, data, shopRequestOption).then(res => res).catch(error => error);
};

/**
 * 服务在架状态变更
 */
export const apiGoodUplowerService = data => {
  return $http.put(`/api-good/api/app/services/uplowerService?id=${data.serviceId}&status=${data.status}`, data, shopRequestOption).then(res => res).catch(error => error);
};

/**
 * 删除服务
 */
export const apiGoodDeleteService = data => {
  return $http.delete(`/api-good/api/app/services/deleteService?id=${data.serviceId}`, data, shopRequestOption).then(res => res).catch(error => error);
};

/**
 * 获取订单结算数据
 */
export const apiOrderCountOrder = data => {
  return $http.get(`/api-order/api/app/order/countOrder`, data, shopRequestOption).then(res => res).catch(error => error);
};

/**
 * 下单
 */
export const apiOrderSetOrder = data => {
  shopRequestOption.headers = {
	  'content-type': 'application/x-www-form-urlencoded'
  }
  return $http.post(`/api-order/api/app/order/setOrder`, data, shopRequestOption).then(res => res).catch(error => error);
};

/**
 * 支付
 */
export const apiOrderPayOrder = data => {
  shopRequestOption.headers = {
	  'content-type': 'application/x-www-form-urlencoded'
  }
  return $http.post(`/api-order/api/app/order/payOrder.json`, data, shopRequestOption).then(res => res).catch(error => error);
};

/**
 * 获取banner详情
 */
export const apiOrderViewAdvertisement = data => {
  return $http.get(`/api-order/api/app/advertisement/viewAdvertisement`, data, shopRequestOption).then(res => res).catch(error => error);
};

/**
 * 商家端获取售后订单列表
 */
export const apiOrderFindShopReturnOrder = data => {
  return $http.get(`/api-order/api/app/return_order/findShopReturnOrder`, data, shopRequestOption).then(res => res).catch(error => error);
};

/**
 * 商家端获取售后订单详情
 */
export const apiOrderViewShopReturnOrder = data => {
  return $http.get(`/api-order/api/app/return_order/viewShopReturnOrder`, data, shopRequestOption).then(res => res).catch(error => error);
};

/**
 * 商家端获取订单流水
 */
export const apiOrderFindFinance = data => {
  return $http.get(`/api-order/api/app/order/findFinance`, data, shopRequestOption).then(res => res).catch(error => error);
};

/**
 * 商家端获取订单列表
 */
export const apiOrderFindShopOrder = data => {
  return $http.get(`/api-order/api/app/order/findShopOrder`, data, shopRequestOption).then(res => res).catch(error => error);
};

/**
 * 商家端获取订单详情
 */
export const apiOrderViewShopOrder = data => {
  return $http.get(`/api-order/api/app/order/viewShopOrder`, data, shopRequestOption).then(res => res).catch(error => error);
};

/**
 * 获取售后订单列表
 */
export const apiOrderFindReturnOrder = data => {
  return $http.get(`/api-order/api/app/return_order/findReturnOrder`, data, shopRequestOption).then(res => res).catch(error => error);
};

/**
 * 获取售后订单详情
 */
export const apiOrderViewReturnOrder = data => {
  return $http.get(`/api-order/api/app/return_order/viewReturnOrder`, data, shopRequestOption).then(res => res).catch(error => error);
};

/**
 * 获取订单列表
 */
export const apiOrderFindOrder = data => {
  return $http.get(`/api-order/api/app/order/findOrder`, data, shopRequestOption).then(res => res).catch(error => error);
};

/**
 * 获取订单详情
 */
export const apiOrderViewOrder = data => {
  return $http.get(`/api-order/api/app/order/viewOrder`, data, shopRequestOption).then(res => res).catch(error => error);
};

/**
 * 取消服务订单
 */
export const apiOrderViewCancelOrder = data => {
  return $http.put(`/api-order/api/app/order/cancelOrder?id=${data.orderId}`, {}, shopRequestOption).then(res => res).catch(error => error);
};

/**
 * 核销服务订单
 */
export const apiOrderWriteOffOrder = data => {
	shopRequestOption.headers = {
		'content-type': 'application/x-www-form-urlencoded'
	}
  return $http.post(`/api-order/api/app/order/writeOffOrder`, data, shopRequestOption).then(res => res).catch(error => error);
};

/**
 * 商家登录
 */
export const apiUserappLoginBusinessUser = data => {
  return $http.get(`/api-userapp/api/app/businessUser/loginBusinessUser`, data, shopRequestOption).then(res => res).catch(error => error);
};

/**
 * 商家注册
 */
export const apiUserRegisterBusinessUser = data => {
  shopRequestOption.headers = {
	'content-type': 'application/x-www-form-urlencoded'
  }
  return $http.post(`/api-userapp/api/app/businessUser/registerBusinessUser`, data, shopRequestOption).then(res => res).catch(error => error);
};

/**
 * 商家注册协议
 */
export const apiUserFindUserAgreement = data => {
  return $http.get(`/api-userapp/api/app/businessUser/findUserAgreement`, data, shopRequestOption).then(res => res).catch(error => error);
};

/**
 * 商家基本资料
 */
export const apiUserFindAccount = data => {
  return $http.get(`/api-userapp/api/app/businessUser/findAccount`, data, shopRequestOption).then(res => res).catch(error => error);
};

/**
 * 商家门店信息
 */
export const apiUserMyBusiness = data => {
  return $http.get(`/api-userapp/api/app/businessUser/MyBusiness`, data, shopRequestOption).then(res => res).catch(error => error);
};
