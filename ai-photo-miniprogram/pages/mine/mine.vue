<template>
  <!-- 我的 - 个人中心页面 -->
  <view class="page">
    <!-- 用户信息头部 -->
    <view class="user-header">
      <view class="user-header-bg"></view>
      <view class="user-info">
        <view class="avatar-wrap" @tap="getUserInfo">
          <image v-if="userInfo.avatar" class="avatar" :src="userInfo.avatar" mode="aspectFill" />
          <view v-else class="avatar-placeholder">
            <text class="avatar-icon">👤</text>
          </view>
        </view>
        <view class="user-detail">
          <text class="nickname" @tap="getUserInfo">{{ userInfo.nickname || '点击登录' }}</text>
          <view class="user-id" v-if="userInfo.nickname">
            <text class="id-text">ID: {{ userInfo.id || '---' }}</text>
          </view>
        </view>
        <!-- 设置齿轮图标 -->
        <view class="settings-icon" @tap="goSettings">
          <text class="settings-emoji">⚙️</text>
        </view>
      </view>
    </view>

    <!-- VIP 卡片区域 -->
    <view class="vip-card" @tap="goPackage">
      <view class="vip-left">
        <view class="vip-badge">
          <text class="vip-badge-text">{{ isVip ? 'VIP' : '免费版' }}</text>
        </view>
        <text class="vip-plan">{{ isVip ? vipPlanName : '升级VIP享无限次数' }}</text>
        <text class="vip-expire" v-if="isVip">有效期至 {{ vipExpire }}</text>
      </view>
      <view class="vip-right">
        <text class="vip-action">{{ isVip ? '续费' : '开通' }} ›</text>
      </view>
    </view>

    <!-- 数据统计 -->
    <view class="stats-section">
      <view class="stat-item">
        <text class="stat-num">{{ stats.totalCount }}</text>
        <text class="stat-label">已制作</text>
      </view>
      <view class="stat-divider"></view>
      <view class="stat-item">
        <text class="stat-num">{{ stats.freeRemain }}</text>
        <text class="stat-label">今日剩余</text>
      </view>
      <view class="stat-divider"></view>
      <view class="stat-item">
        <text class="stat-num">{{ stats.savedCount }}</text>
        <text class="stat-label">已保存</text>
      </view>
    </view>

    <!-- 菜单列表 -->
    <view class="menu-section">
      <view
        v-for="item in menuList"
        :key="item.id"
        class="menu-item"
        @tap="onMenuTap(item)"
      >
        <view class="menu-left">
          <text class="menu-icon">{{ item.icon }}</text>
          <text class="menu-name">{{ item.name }}</text>
        </view>
        <view class="menu-right">
          <text v-if="item.badge" class="menu-badge">{{ item.badge }}</text>
          <text class="menu-arrow">›</text>
        </view>
      </view>
    </view>

    <!-- 底部版本号 -->
    <view class="footer">
      <text class="version">AI证件照 v1.0.0</text>
    </view>
  </view>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { getUserStats, getUserVipInfo } from '@/api/user'

// 用户信息
const userInfo = reactive({
  avatar: '',
  nickname: '',
  id: '',
})

// VIP 状态
const isVip = ref(false)
const vipPlanName = ref('')
const vipExpire = ref('')

// 统计数据
const stats = reactive({
  totalCount: 0,
  freeRemain: 3,
  savedCount: 0,
})

// 菜单列表
const menuList = ref([
  { id: 'history', name: '我的照片', icon: '🖼️', url: '/pages/history/history', badge: '' },
  { id: 'package', name: '套餐购买', icon: '💎', url: '/pages/package/package', badge: '' },
  { id: 'tutorial', name: '使用教程', icon: '📖', url: '/pages/tutorial/tutorial', badge: '' },
  { id: 'faq', name: '常见问题', icon: '❓', url: '/pages/faq/faq', badge: '' },
  { id: 'feedback', name: '意见反馈', icon: '💬', url: '', badge: '' },
  { id: 'about', name: '关于我们', icon: 'ℹ️', url: '/pages/about/about', badge: '' },
])

// 页面显示时刷新数据
onMounted(() => {
  loadUserInfo()
  loadStats()
  loadVipInfo()
})

// 获取用户信息（微信授权）
const getUserInfo = () => {
  // #ifdef MP-WEIXIN
  wx.getUserProfile({
    desc: '用于展示头像和昵称',
    success: (res) => {
      userInfo.avatar = res.userInfo.avatarUrl
      userInfo.nickname = res.userInfo.nickName
    },
    fail: () => {
      console.log('用户拒绝授权')
    },
  })
  // #endif
  // #ifndef MP-WEIXIN
  uni.showToast({ title: '请在微信小程序中使用', icon: 'none' })
  // #endif
}

// 加载本地缓存的用户信息
const loadUserInfo = () => {
  try {
    const cached = uni.getStorageSync('userInfo')
    if (cached) {
      Object.assign(userInfo, JSON.parse(cached))
    }
  } catch (e) {
    console.log('读取缓存用户信息失败')
  }
}

// 加载统计数据
const loadStats = async () => {
  try {
    const res = await getUserStats()
    if (res) {
      stats.totalCount = res.totalCount || 0
      stats.freeRemain = res.freeRemain ?? 3
      stats.savedCount = res.savedCount || 0
    }
  } catch (e) {
    console.log('获取统计数据失败')
  }
}

// 加载VIP信息
const loadVipInfo = async () => {
  try {
    const res = await getUserVipInfo()
    if (res && res.isVip) {
      isVip.value = true
      vipPlanName.value = res.planName || 'VIP会员'
      vipExpire.value = res.expireDate || ''
    }
  } catch (e) {
    console.log('获取VIP信息失败')
  }
}

// 菜单点击
const onMenuTap = (item) => {
  if (item.id === 'feedback') {
    // 意见反馈使用微信内置反馈
    // #ifdef MP-WEIXIN
    // 小程序内置反馈入口无法直接调用，改用 navigateTo
    uni.showModal({
      title: '意见反馈',
      content: '您可以通过「小程序设置 → 反馈与投诉」提交反馈，或联系客服。',
      confirmText: '联系客服',
      cancelText: '知道了',
    })
    // #endif
    return
  }
  if (item.url) {
    uni.navigateTo({ url: item.url })
  }
}

// 跳转设置
const goSettings = () => {
  uni.navigateTo({ url: '/pages/settings/settings' })
}

// 跳转套餐购买
const goPackage = () => {
  uni.navigateTo({ url: '/pages/package/package' })
}
</script>

<style lang="scss" scoped>
.page {
  min-height: 100vh;
  background: #F5F7FA;
  padding-bottom: calc(env(safe-area-inset-bottom) + 30rpx);
}

/* 用户头部 */
.user-header {
  position: relative;
  padding: 80rpx 30rpx 40rpx;
  overflow: hidden;
}
.user-header-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, #4A90D9 0%, #357ABD 100%);
}
.user-info {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
}
.avatar-wrap {
  width: 120rpx;
  height: 120rpx;
  border-radius: 50%;
  overflow: hidden;
  border: 4rpx solid rgba(255, 255, 255, 0.5);
  flex-shrink: 0;
}
.avatar {
  width: 100%;
  height: 100%;
}
.avatar-placeholder {
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
}
.avatar-icon {
  font-size: 56rpx;
}
.user-detail {
  flex: 1;
  margin-left: 24rpx;
}
.nickname {
  font-size: 34rpx;
  font-weight: 600;
  color: #fff;
}
.user-id {
  margin-top: 6rpx;
}
.id-text {
  font-size: 22rpx;
  color: rgba(255, 255, 255, 0.7);
}
.settings-icon {
  padding: 16rpx;
}
.settings-emoji {
  font-size: 40rpx;
}

/* VIP 卡片 */
.vip-card {
  margin: -20rpx 24rpx 0;
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 28rpx 30rpx;
  background: linear-gradient(135deg, #2C2C2C 0%, #1A1A1A 100%);
  border-radius: 16rpx;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.15);
}
.vip-badge {
  display: inline-flex;
  padding: 4rpx 16rpx;
  background: linear-gradient(135deg, #F6D365 0%, #D4A017 100%);
  border-radius: 20rpx;
  margin-bottom: 8rpx;
}
.vip-badge-text {
  font-size: 22rpx;
  font-weight: 700;
  color: #1A1A1A;
}
.vip-plan {
  font-size: 26rpx;
  color: #F6D365;
}
.vip-expire {
  font-size: 22rpx;
  color: rgba(255, 255, 255, 0.5);
  margin-top: 4rpx;
}
.vip-action {
  font-size: 26rpx;
  color: #F6D365;
  font-weight: 500;
}

/* 统计数据 */
.stats-section {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 24rpx;
  padding: 30rpx 0;
  background: #fff;
  border-radius: 16rpx;
  box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.05);
}
.stat-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.stat-num {
  font-size: 40rpx;
  font-weight: 700;
  color: #4A90D9;
}
.stat-label {
  font-size: 24rpx;
  color: #999;
  margin-top: 6rpx;
}
.stat-divider {
  width: 1rpx;
  height: 60rpx;
  background: #eee;
}

/* 菜单列表 */
.menu-section {
  margin: 0 24rpx;
  background: #fff;
  border-radius: 16rpx;
  overflow: hidden;
  box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.05);
}
.menu-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 30rpx;
  border-bottom: 1rpx solid #f5f5f5;
  &:last-child {
    border-bottom: none;
  }
  &:active {
    background: #f9f9f9;
  }
}
.menu-left {
  display: flex;
  align-items: center;
}
.menu-icon {
  font-size: 36rpx;
  margin-right: 20rpx;
}
.menu-name {
  font-size: 30rpx;
  color: #333;
}
.menu-right {
  display: flex;
  align-items: center;
}
.menu-badge {
  font-size: 22rpx;
  color: #fff;
  background: #F5222D;
  padding: 2rpx 12rpx;
  border-radius: 20rpx;
  margin-right: 10rpx;
}
.menu-arrow {
  font-size: 30rpx;
  color: #ccc;
}

/* 底部版本号 */
.footer {
  padding: 40rpx 0;
  text-align: center;
}
.version {
  font-size: 22rpx;
  color: #ccc;
}
</style>
