/**
 * HTTP 请求封装
 * 统一处理请求拦截、响应拦截、错误提示
 */

// 基础配置
const BASE_URL = 'https://api.ai-photo.example.com' // TODO: 替换为实际服务端地址
const TIMEOUT = 15000

/**
 * 从本地存储获取 token
 */
function getToken() {
  return uni.getStorageSync('token') || ''
}

/**
 * 请求拦截器 - 附加公共参数和 headers
 */
function requestInterceptor(options) {
  const token = getToken()
  if (!options.header) {
    options.header = {}
  }
  if (token) {
    options.header['Authorization'] = `Bearer ${token}`
  }
  options.header['Content-Type'] = options.header['Content-Type'] || 'application/json'
  return options
}

/**
 * 响应拦截器 - 统一处理响应状态
 */
function responseInterceptor(response) {
  const { statusCode, data } = response

  // token 过期，跳转登录
  if (statusCode === 401) {
    uni.removeStorageSync('token')
    uni.showToast({ title: '登录已过期，请重新登录', icon: 'none' })
    return Promise.reject(new Error('未授权'))
  }

  // 服务端错误
  if (statusCode >= 500) {
    uni.showToast({ title: '服务器繁忙，请稍后重试', icon: 'none' })
    return Promise.reject(new Error('服务器错误'))
  }

  // 业务错误
  if (statusCode >= 400) {
    const msg = (data && data.message) || '请求失败'
    uni.showToast({ title: msg, icon: 'none' })
    return Promise.reject(new Error(msg))
  }

  // 正常响应，检查业务 code
  if (data && data.code !== undefined && data.code !== 0) {
    const msg = data.message || '操作失败'
    uni.showToast({ title: msg, icon: 'none' })
    return Promise.reject(new Error(msg))
  }

  return data
}

/**
 * 通用请求方法
 * @param {string} url - 请求路径（相对路径）
 * @param {string} method - 请求方法
 * @param {object} data - 请求数据
 * @param {object} extraOptions - 额外配置
 */
function request(url, method = 'GET', data = {}, extraOptions = {}) {
  let options = {
    url: `${BASE_URL}${url}`,
    method,
    data,
    timeout: TIMEOUT,
    ...extraOptions,
  }

  // 请求拦截
  options = requestInterceptor(options)

  return new Promise((resolve, reject) => {
    uni.request({
      ...options,
      success: (res) => {
        responseInterceptor(res).then(resolve).catch(reject)
      },
      fail: (err) => {
        uni.showToast({ title: '网络异常，请检查网络连接', icon: 'none' })
        reject(err)
      },
    })
  })
}

/**
 * GET 请求
 */
export function get(url, params = {}, options = {}) {
  return request(url, 'GET', params, options)
}

/**
 * POST 请求
 */
export function post(url, data = {}, options = {}) {
  return request(url, 'POST', data, options)
}

/**
 * 文件上传
 * @param {string} url - 上传接口路径
 * @param {string} filePath - 本地文件临时路径
 * @param {string} name - 文件字段名
 * @param {object} formData - 附加表单数据
 */
export function upload(url, filePath, name = 'file', formData = {}) {
  const token = getToken()
  return new Promise((resolve, reject) => {
    uni.uploadFile({
      url: `${BASE_URL}${url}`,
      filePath,
      name,
      formData,
      header: {
        Authorization: token ? `Bearer ${token}` : '',
      },
      timeout: 30000, // 上传超时稍长
      success: (res) => {
        // uploadFile 返回的 data 是字符串，需要解析
        let data
        try {
          data = JSON.parse(res.data)
        } catch {
          data = res.data
        }
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(data)
        } else {
          const msg = (data && data.message) || '上传失败'
          uni.showToast({ title: msg, icon: 'none' })
          reject(new Error(msg))
        }
      },
      fail: (err) => {
        uni.showToast({ title: '上传失败，请检查网络', icon: 'none' })
        reject(err)
      },
    })
  })
}

export default { get, post, upload }
