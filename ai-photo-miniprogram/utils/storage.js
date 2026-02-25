/**
 * 本地存储工具
 * 封装 uni.getStorageSync / setStorageSync，提供业务级存取方法
 */

const TOKEN_KEY = 'token'
const DAILY_USAGE_KEY = 'daily_usage'
const PHOTO_HISTORY_KEY = 'photo_history'

// ========== Token 管理 ==========

/** 获取登录 token */
export function getToken() {
  return uni.getStorageSync(TOKEN_KEY) || ''
}

/** 保存登录 token */
export function setToken(token) {
  uni.setStorageSync(TOKEN_KEY, token)
}

/** 清除登录 token */
export function removeToken() {
  uni.removeStorageSync(TOKEN_KEY)
}

// ========== 每日使用次数 ==========

/**
 * 获取今日日期字符串 YYYY-MM-DD
 */
function getTodayStr() {
  const d = new Date()
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

/**
 * 获取今日已使用次数
 * 每天自动重置（通过日期判断）
 */
export function getDailyUsage() {
  const data = uni.getStorageSync(DAILY_USAGE_KEY)
  if (!data || data.date !== getTodayStr()) {
    return 0
  }
  return data.count || 0
}

/**
 * 增加今日使用次数
 * @returns {number} 更新后的使用次数
 */
export function incrementDailyUsage() {
  const today = getTodayStr()
  const data = uni.getStorageSync(DAILY_USAGE_KEY)

  let count = 1
  if (data && data.date === today) {
    count = (data.count || 0) + 1
  }

  uni.setStorageSync(DAILY_USAGE_KEY, { date: today, count })
  return count
}

// ========== 照片历史记录 ==========

/**
 * 获取照片处理历史
 * @param {number} limit - 最多返回条数，默认 50
 * @returns {Array} 历史记录数组
 */
export function getPhotoHistory(limit = 50) {
  const list = uni.getStorageSync(PHOTO_HISTORY_KEY) || []
  return list.slice(0, limit)
}

/**
 * 添加一条历史记录
 * @param {object} record - 记录对象 { taskId, specName, bgColor, thumbUrl, createdAt }
 */
export function addToHistory(record) {
  const list = uni.getStorageSync(PHOTO_HISTORY_KEY) || []
  list.unshift({
    ...record,
    createdAt: record.createdAt || Date.now(),
  })
  // 最多保留 100 条
  if (list.length > 100) {
    list.length = 100
  }
  uni.setStorageSync(PHOTO_HISTORY_KEY, list)
}

export default {
  getToken,
  setToken,
  removeToken,
  getDailyUsage,
  incrementDailyUsage,
  getPhotoHistory,
  addToHistory,
}
