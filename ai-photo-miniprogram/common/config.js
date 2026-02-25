/**
 * config.js - 全局配置文件
 * AI证件照小程序
 *
 * 说明：集中管理所有可配置项，方便维护和环境切换
 */

/* ========================================
 * 🌐 API 配置
 * ======================================== */

/** API 基础地址（请替换为实际后端地址） */
const API_BASE_URL = 'https://api.your-domain.com/v1'

/** API 请求超时时间（毫秒） */
const API_TIMEOUT = 30000

/** 上传文件超时时间（毫秒） */
const UPLOAD_TIMEOUT = 60000

/* ========================================
 * 📢 广告配置
 * ======================================== */

/** 广告单元 ID（请替换为实际广告位 ID） */
const AD_UNIT_IDS = {
  /** 首页 Banner 广告 */
  homeBanner: 'adunit-home-banner-placeholder',
  /** 结果页插屏广告 */
  resultInterstitial: 'adunit-result-interstitial-placeholder',
  /** 激励视频广告（免费使用次数） */
  rewardVideo: 'adunit-reward-video-placeholder',
  /** 原生模板广告 */
  nativeTemplate: 'adunit-native-template-placeholder'
}

/* ========================================
 * 📷 证件照规格配置
 * ======================================== */

/**
 * 证件照尺寸规格
 * width/height 单位：毫米(mm)
 * pixelWidth/pixelHeight 单位：像素(px)，基于 300dpi 计算
 */
const PHOTO_SPECS = [
  {
    id: 'one_inch',
    name: '一寸',
    label: '一寸照片',
    description: '常用于身份证、学生证、工作证等',
    width: 25,
    height: 35,
    pixelWidth: 295,
    pixelHeight: 413,
    popular: true
  },
  {
    id: 'two_inch',
    name: '二寸',
    label: '二寸照片',
    description: '常用于护照、签证、驾照等',
    width: 35,
    height: 49,
    pixelWidth: 413,
    pixelHeight: 579,
    popular: true
  },
  {
    id: 'small_one_inch',
    name: '小一寸',
    label: '小一寸照片',
    description: '常用于驾驶证、社保卡等',
    width: 22,
    height: 32,
    pixelWidth: 260,
    pixelHeight: 378,
    popular: false
  },
  {
    id: 'large_one_inch',
    name: '大一寸',
    label: '大一寸照片',
    description: '常用于中国护照、港澳通行证等',
    width: 33,
    height: 48,
    pixelWidth: 390,
    pixelHeight: 567,
    popular: false
  },
  {
    id: 'visa',
    name: '签证照',
    label: '签证照片',
    description: '常用于各国签证申请',
    width: 33,
    height: 48,
    pixelWidth: 390,
    pixelHeight: 567,
    popular: true
  },
  {
    id: 'graduate_exam',
    name: '考研照',
    label: '考研报名照',
    description: '用于研究生考试报名',
    width: 33,
    height: 48,
    pixelWidth: 390,
    pixelHeight: 567,
    popular: true
  }
]

/* ========================================
 * 💰 定价与免费额度
 * ======================================== */

/** 每日免费使用次数 */
const FREE_DAILY_LIMIT = 1

/** 价格配置（单位：分） */
const PRICES = {
  /** 单次制作价格 */
  single: 299,
  /** 3次套餐价格 */
  pack3: 599,
  /** 10次套餐价格 */
  pack10: 1499,
  /** 月度会员价格 */
  monthly: 1999,
  /** 年度会员价格 */
  yearly: 9999,
  /** 高清下载附加费 */
  hdDownload: 99,
  /** 排版打印附加费 */
  printLayout: 199
}

/* ========================================
 * 🖼 图片处理配置
 * ======================================== */

/** 图片压缩质量（0-100） */
const IMAGE_QUALITY = 95

/** 最大上传图片大小（字节，10MB） */
const MAX_IMAGE_SIZE = 10 * 1024 * 1024

/** 支持的图片格式 */
const SUPPORTED_IMAGE_TYPES = ['jpg', 'jpeg', 'png', 'bmp', 'webp']

/* ========================================
 * 🔧 其他配置
 * ======================================== */

/** 缓存 key 前缀 */
const CACHE_PREFIX = 'ai_photo_'

/** 缓存过期时间（毫秒，7天） */
const CACHE_EXPIRE = 7 * 24 * 60 * 60 * 1000

/** 客服微信号（占位） */
const CUSTOMER_SERVICE_WECHAT = 'your-wechat-id'

/* ========================================
 * 导出配置
 * ======================================== */
export default {
  API_BASE_URL,
  API_TIMEOUT,
  UPLOAD_TIMEOUT,
  AD_UNIT_IDS,
  PHOTO_SPECS,
  FREE_DAILY_LIMIT,
  PRICES,
  IMAGE_QUALITY,
  MAX_IMAGE_SIZE,
  SUPPORTED_IMAGE_TYPES,
  CACHE_PREFIX,
  CACHE_EXPIRE,
  CUSTOMER_SERVICE_WECHAT
}

/* 也支持按需导入 */
export {
  API_BASE_URL,
  API_TIMEOUT,
  UPLOAD_TIMEOUT,
  AD_UNIT_IDS,
  PHOTO_SPECS,
  FREE_DAILY_LIMIT,
  PRICES,
  IMAGE_QUALITY,
  MAX_IMAGE_SIZE,
  SUPPORTED_IMAGE_TYPES,
  CACHE_PREFIX,
  CACHE_EXPIRE,
  CUSTOMER_SERVICE_WECHAT
}
