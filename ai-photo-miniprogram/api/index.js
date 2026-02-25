/**
 * API 统一入口
 * 按模块重新导出，方便页面按需引入
 */
export * from './photo'
export * from './user'

// 也支持按模块导入
export * as photoApi from './photo'
export * as userApi from './user'
