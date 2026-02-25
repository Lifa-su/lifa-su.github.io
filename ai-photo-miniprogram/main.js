/**
 * main.js - 应用入口文件
 * AI证件照小程序 - Vue 3 + uni-app
 */

import { createSSRApp } from 'vue'
import App from './App.vue'
import store from './store'

/**
 * 创建应用实例
 * uni-app 使用 createSSRApp 以支持服务端渲染
 */
export function createApp() {
  const app = createSSRApp(App)

  // 挂载 Vuex Store
  app.use(store)

  return {
    app
  }
}
