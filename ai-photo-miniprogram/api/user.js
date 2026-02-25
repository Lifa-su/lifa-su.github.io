/**
 * 用户相关 API
 */
import { post, get } from '@/utils/request'

/**
 * 微信登录
 * 调用 wx.login 获取 code，发送到服务端换取 token
 * @returns {Promise<{token: string, userInfo: object}>}
 */
export function login() {
  return new Promise((resolve, reject) => {
    uni.login({
      provider: 'weixin',
      success: (loginRes) => {
        if (!loginRes.code) {
          reject(new Error('wx.login 获取 code 失败'))
          return
        }
        // 将 code 发送到服务端换取自定义登录态
        post('/api/user/login', { code: loginRes.code })
          .then(resolve)
          .catch(reject)
      },
      fail: (err) => {
        reject(err)
      },
    })
  })
}

/**
 * 获取用户信息
 * @returns {Promise<{nickname: string, avatar: string, ...}>}
 */
export function getUserInfo() {
  return get('/api/user/info')
}

/**
 * 获取今日剩余免费使用次数
 * @returns {Promise<{quota: number, used: number, total: number}>}
 */
export function getDailyQuota() {
  return get('/api/user/daily-quota')
}

/**
 * 获取用户照片处理历史
 * @returns {Promise<Array<{taskId, specName, thumbUrl, createdAt}>>}
 */
export function getHistory() {
  return get('/api/user/history')
}

/**
 * 创建支付订单
 * @param {object} params
 * @param {string} params.taskId - 关联的照片任务 ID
 * @param {string} params.productType - 商品类型（如 'hd_download', 'vip_pack'）
 * @returns {Promise<object>} 微信支付参数（用于 wx.requestPayment）
 */
export function createOrder(params) {
  return post('/api/user/create-order', params)
}

/**
 * 验证广告观看奖励（服务端校验）
 * @param {string} adId - 广告展示 ID / 交易 ID
 * @returns {Promise<{verified: boolean}>}
 */
export function verifyAdReward(adId) {
  return post('/api/user/verify-ad-reward', { adId })
}
