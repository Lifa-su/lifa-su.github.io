/**
 * 广告管理工具
 * 封装激励视频广告和 Banner 广告的创建、缓存、展示逻辑
 */

// 广告实例缓存（避免重复创建）
const adInstances = {}

// 本地广告展示次数记录 key
const AD_IMPRESSION_KEY = 'ad_impressions'

/**
 * 初始化激励视频广告
 * 创建并缓存广告实例，自动预加载
 * @param {string} adUnitId - 广告单元 ID
 * @returns {object|null} 广告实例，不支持时返回 null
 */
export function initRewardedAd(adUnitId) {
  if (!adUnitId) return null

  // 已缓存则直接返回
  if (adInstances[adUnitId]) {
    return adInstances[adUnitId]
  }

  // 仅微信小程序环境支持
  // #ifdef MP-WEIXIN
  if (wx.createRewardedVideoAd) {
    const ad = wx.createRewardedVideoAd({ adUnitId })
    // 预加载
    ad.load().catch(() => {
      console.warn('[ad] 激励视频预加载失败:', adUnitId)
    })
    adInstances[adUnitId] = ad
    return ad
  }
  // #endif

  console.warn('[ad] 当前环境不支持激励视频广告')
  return null
}

/**
 * 展示激励视频广告（Promise 封装）
 * @param {string} adUnitId - 广告单元 ID
 * @returns {Promise<boolean>} resolve(true) 表示用户看完获得奖励
 */
export function showRewardedAd(adUnitId) {
  return new Promise((resolve, reject) => {
    const ad = adInstances[adUnitId]
    if (!ad) {
      reject(new Error('广告实例不存在，请先调用 initRewardedAd'))
      return
    }

    // 绑定关闭回调（一次性）
    const onClose = (res) => {
      ad.offClose(onClose)
      if (res && res.isEnded) {
        trackImpression(adUnitId)
        resolve(true)
      } else {
        // 用户中途关闭，不发放奖励
        resolve(false)
      }
    }

    const onError = (err) => {
      ad.offError(onError)
      ad.offClose(onClose)
      reject(err)
    }

    ad.onClose(onClose)
    ad.onError(onError)

    // 先尝试展示，失败则重新加载后再展示
    ad.show().catch(() => {
      ad.load()
        .then(() => ad.show())
        .catch((err) => {
          ad.offClose(onClose)
          ad.offError(onError)
          reject(err)
        })
    })
  })
}

/**
 * 初始化 Banner 广告
 * @param {string} adUnitId - 广告单元 ID
 * @param {object} style - 广告样式 { left, top, width }
 * @returns {object|null} Banner 广告实例
 */
export function initBannerAd(adUnitId, style = {}) {
  if (!adUnitId) return null

  // #ifdef MP-WEIXIN
  if (wx.createBannerAd) {
    const windowInfo = uni.getWindowInfo()
    const bannerAd = wx.createBannerAd({
      adUnitId,
      style: {
        left: style.left || 0,
        top: style.top || windowInfo.windowHeight - 100,
        width: style.width || windowInfo.windowWidth,
      },
    })

    bannerAd.onError((err) => {
      console.warn('[ad] Banner 广告加载失败:', err)
    })

    return bannerAd
  }
  // #endif

  return null
}

/**
 * 记录广告展示次数（本地统计）
 * @param {string} adUnitId - 广告单元 ID
 */
function trackImpression(adUnitId) {
  try {
    const data = uni.getStorageSync(AD_IMPRESSION_KEY) || {}
    const today = new Date().toISOString().slice(0, 10)

    if (!data[today]) {
      data[today] = {}
    }
    data[today][adUnitId] = (data[today][adUnitId] || 0) + 1

    // 只保留最近 7 天的记录
    const keys = Object.keys(data).sort()
    while (keys.length > 7) {
      delete data[keys.shift()]
    }

    uni.setStorageSync(AD_IMPRESSION_KEY, data)
  } catch (e) {
    console.warn('[ad] 记录展示次数失败:', e)
  }
}

/**
 * 获取广告展示统计
 * @param {string} date - 日期 YYYY-MM-DD，默认今天
 * @returns {object} { adUnitId: count }
 */
export function getImpressions(date) {
  const d = date || new Date().toISOString().slice(0, 10)
  const data = uni.getStorageSync(AD_IMPRESSION_KEY) || {}
  return data[d] || {}
}

export default {
  initRewardedAd,
  showRewardedAd,
  initBannerAd,
  getImpressions,
}
