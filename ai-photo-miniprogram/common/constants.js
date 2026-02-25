/**
 * constants.js - 全局常量定义
 * AI证件照小程序
 *
 * 说明：定义应用中使用的所有枚举值和常量，避免硬编码
 */

/* ========================================
 * 🎨 证件照背景颜色
 * ======================================== */

/** 背景颜色选项 */
export const BACKGROUND_COLORS = [
  {
    id: 'white',
    name: '白色',
    color: '#FFFFFF',
    description: '适用于身份证、护照、驾照等',
    popular: true
  },
  {
    id: 'blue',
    name: '蓝色',
    color: '#438EDB',
    description: '适用于毕业证、工作证、简历等',
    popular: true
  },
  {
    id: 'red',
    name: '红色',
    color: '#FF0000',
    description: '适用于结婚证、党员证等',
    popular: true
  },
  {
    id: 'gradient_blue',
    name: '渐变蓝',
    color: '#4A90D9',
    description: '适用于艺术照、社交头像等',
    popular: false
  }
]

/** 背景颜色值映射（快速查找） */
export const BG_COLOR_MAP = {
  white: '#FFFFFF',
  blue: '#438EDB',
  red: '#FF0000',
  gradient_blue: '#4A90D9'
}

/* ========================================
 * 📂 照片分类
 * ======================================== */

/** 证件照使用场景分类 */
export const PHOTO_CATEGORIES = [
  {
    id: 'id_card',
    name: '证件类',
    icon: 'id-card',
    items: ['身份证', '护照', '港澳通行证', '台湾通行证', '驾驶证']
  },
  {
    id: 'education',
    name: '教育类',
    icon: 'education',
    items: ['考研报名', '四六级', '教师资格证', '学生证', '毕业证']
  },
  {
    id: 'work',
    name: '职场类',
    icon: 'work',
    items: ['简历照', '工作证', '社保卡', '营业执照']
  },
  {
    id: 'visa',
    name: '签证类',
    icon: 'visa',
    items: ['美国签证', '日本签证', '韩国签证', '欧洲申根签证', '英国签证']
  },
  {
    id: 'other',
    name: '其他',
    icon: 'more',
    items: ['结婚证', '健康证', '社交头像']
  }
]

/* ========================================
 * 📋 订单状态枚举
 * ======================================== */

/** 订单状态 */
export const ORDER_STATUS = {
  /** 待支付 */
  PENDING: 0,
  /** 已支付，处理中 */
  PROCESSING: 1,
  /** 处理完成 */
  COMPLETED: 2,
  /** 已取消 */
  CANCELLED: 3,
  /** 已退款 */
  REFUNDED: 4,
  /** 处理失败 */
  FAILED: 5
}

/** 订单状态文字映射 */
export const ORDER_STATUS_TEXT = {
  [ORDER_STATUS.PENDING]: '待支付',
  [ORDER_STATUS.PROCESSING]: '处理中',
  [ORDER_STATUS.COMPLETED]: '已完成',
  [ORDER_STATUS.CANCELLED]: '已取消',
  [ORDER_STATUS.REFUNDED]: '已退款',
  [ORDER_STATUS.FAILED]: '处理失败'
}

/** 订单状态颜色映射 */
export const ORDER_STATUS_COLOR = {
  [ORDER_STATUS.PENDING]: '#F39C12',
  [ORDER_STATUS.PROCESSING]: '#4A90D9',
  [ORDER_STATUS.COMPLETED]: '#27AE60',
  [ORDER_STATUS.CANCELLED]: '#999999',
  [ORDER_STATUS.REFUNDED]: '#E74C3C',
  [ORDER_STATUS.FAILED]: '#E74C3C'
}

/* ========================================
 * 🔑 缓存 Key 常量
 * ======================================== */

/** 本地存储 Key */
export const STORAGE_KEYS = {
  /** 用户信息 */
  USER_INFO: 'user_info',
  /** 登录 Token */
  TOKEN: 'token',
  /** 今日免费使用次数 */
  FREE_COUNT_TODAY: 'free_count_today',
  /** 免费次数日期标记 */
  FREE_COUNT_DATE: 'free_count_date',
  /** 历史记录 */
  HISTORY: 'photo_history',
  /** 用户偏好设置 */
  PREFERENCES: 'user_preferences'
}

/* ========================================
 * 📡 事件名称常量
 * ======================================== */

/** 全局事件名 */
export const EVENTS = {
  /** 照片处理完成 */
  PHOTO_DONE: 'photo:done',
  /** 登录成功 */
  LOGIN_SUCCESS: 'user:login',
  /** 支付成功 */
  PAY_SUCCESS: 'pay:success',
  /** 广告观看完成 */
  AD_COMPLETE: 'ad:complete'
}
