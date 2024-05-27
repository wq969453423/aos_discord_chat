const axios = require('axios');
const settings = require('../config');

// 创建axios实例
const request = axios.create({
	baseURL: settings.backendApi,
	timeout: 5000,
});

// 添加请求拦截器
request.interceptors.request.use(function(config) {
	// 在发送请求之前做些什么
	return config;
}, function(error) {
	// 对请求错误做些什么
	return Promise.reject(error);
});

// 添加响应拦截器
request.interceptors.response.use(function(response) {
	// 2xx 范围内的状态码都会触发该函数。
	// 对响应数据做点什么
	console.log(response.data);
  // 在这里对响应数据进行处理
  const responseData = response.data;
  // 检查响应体中的 code
  if (responseData && responseData?.code === 200) {
    // 返回正常的响应数据
    return responseData;
  }
  // 在这里处理特定的错误情况
  console.error('服务器返回了错误', response.data);
  return Promise.reject(response.data);
}, function(error) {
	// 超出 2xx 范围的状态码都会触发该函数。
	// 对响应错误做点什么
	// 统一错误提示
	return Promise.reject(error);
});


module.exports = request;