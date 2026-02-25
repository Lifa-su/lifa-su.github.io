/**
 * store/index.js - Vuex 状态管理
 * AI证件照小程序
 */

import { createStore } from 'vuex'

const store = createStore({
  state() {
    return {
      /** 用户信息 */
      userInfo: null,
      /** 登录状态 */
      isLoggedIn: false,
      /** 今日剩余免费次数 */
      freeCountToday: 1,
      /** 当前选择的照片规格 */
      currentSpec: null,
      /** 当前选择的背景颜色 */
      currentBgColor: '#FFFFFF'
    }
  },

  mutations: {
    SET_USER_INFO(state, info) {
      state.userInfo = info
      state.isLoggedIn = !!info
    },
    SET_FREE_COUNT(state, count) {
      state.freeCountToday = count
    },
    SET_CURRENT_SPEC(state, spec) {
      state.currentSpec = spec
    },
    SET_CURRENT_BG_COLOR(state, color) {
      state.currentBgColor = color
    }
  },

  actions: {
    /** 更新用户信息 */
    updateUserInfo({ commit }, info) {
      commit('SET_USER_INFO', info)
    }
  }
})

export default store
