<template>
  <!-- 首页 - AI证件照 -->
  <view class="page">
    <!-- 顶部英雄横幅区域 -->
    <view class="hero">
      <view class="hero-bg">
        <view class="hero-circle circle-1"></view>
        <view class="hero-circle circle-2"></view>
      </view>
      <view class="hero-content">
        <image class="hero-icon" src="/static/icons/camera-ai.png" mode="aspectFit" />
        <text class="hero-title">AI证件照</text>
        <text class="hero-tagline">一键生成标准证件照，智能换背景</text>
      </view>
    </view>

    <!-- 热门规格分类网格 -->
    <view class="section">
      <view class="section-header">
        <text class="section-title">选择照片规格</text>
        <text class="section-more" @tap="goAllSpecs">全部规格 ›</text>
      </view>
      <view class="spec-grid">
        <view
          class="spec-card"
          v-for="item in specList"
          :key="item.id"
          @tap="goCamera(item)"
        >
          <view class="spec-icon-wrap" :style="{ background: item.bgColor }">
            <text class="spec-icon">{{ item.icon }}</text>
          </view>
          <text class="spec-name">{{ item.name }}</text>
          <text class="spec-size">{{ item.size }}</text>
        </view>
      </view>
    </view>

    <!-- 开始制作 CTA 按钮 -->
    <view class="cta-section">
      <button class="cta-btn" @tap="goCamera()">
        <text class="cta-icon">📷</text>
        <text class="cta-text">开始制作</text>
      </button>
    </view>

    <!-- 今日剩余免费次数 -->
    <view class="free-count-section">
      <view class="free-count-card">
        <view class="free-count-left">
          <text class="free-count-label">今日剩余免费次数</text>
          <text class="free-count-tip">每日重置，用完可看广告获取</text>
        </view>
        <view class="free-count-right">
          <text class="free-count-num">{{ freeCount }}</text>
          <text class="free-count-unit">次</text>
        </view>
      </view>
    </view>

    <!-- 底部广告位 -->
    <view class="ad-section">
      <ad-reward ref="adRewardRef" />
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getUserFreeCount } from '@/api/user'

// 广告组件
import adReward from '@/components/ad-reward/ad-reward.vue'

// 今日剩余免费次数
const freeCount = ref(3)

// 热门规格列表
const specList = ref([
  { id: 'one-inch', name: '一寸照', size: '25×35mm', icon: '🪪', bgColor: 'rgba(74,144,217,0.12)' },
  { id: 'two-inch', name: '二寸照', size: '35×49mm', icon: '🖼️', bgColor: 'rgba(82,196,26,0.12)' },
  { id: 'visa', name: '签证照', size: '33×48mm', icon: '✈️', bgColor: 'rgba(250,173,20,0.12)' },
  { id: 'graduate', name: '考研照', size: '33×48mm', icon: '🎓', bgColor: 'rgba(114,46,209,0.12)' },
  { id: 'teacher', name: '教资照', size: '25×35mm', icon: '📚', bgColor: 'rgba(245,108,108,0.12)' },
  { id: 'resume', name: '简历照', size: '25×35mm', icon: '💼', bgColor: 'rgba(24,144,255,0.12)' },
])

// 跳转拍照页
const goCamera = (spec) => {
  const query = spec ? `?specId=${spec.id}&specName=${encodeURIComponent(spec.name)}` : ''
  uni.navigateTo({ url: `/pages/camera/camera${query}` })
}

// 查看全部规格
const goAllSpecs = () => {
  uni.navigateTo({ url: '/pages/camera/camera' })
}

// 页面加载时获取免费次数
onMounted(async () => {
  try {
    const res = await getUserFreeCount()
    if (res && res.count !== undefined) {
      freeCount.value = res.count
    }
  } catch (e) {
    console.log('获取免费次数失败，使用默认值')
  }
})
</script>

<style lang="scss" scoped>
.page {
  min-height: 100vh;
  background: #F5F7FA;
  padding-bottom: calc(env(safe-area-inset-bottom) + 30rpx);
}

/* 英雄横幅 */
.hero {
  position: relative;
  height: 400rpx;
  overflow: hidden;
  background: linear-gradient(135deg, #4A90D9 0%, #357ABD 100%);
}
.hero-bg {
  position: absolute;
  width: 100%;
  height: 100%;
}
.hero-circle {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.08);
}
.circle-1 {
  width: 300rpx;
  height: 300rpx;
  top: -80rpx;
  right: -60rpx;
}
.circle-2 {
  width: 200rpx;
  height: 200rpx;
  bottom: -40rpx;
  left: -30rpx;
}
.hero-content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 0 40rpx;
}
.hero-icon {
  width: 100rpx;
  height: 100rpx;
  margin-bottom: 16rpx;
}
.hero-title {
  font-size: 52rpx;
  font-weight: 700;
  color: #fff;
  letter-spacing: 4rpx;
}
.hero-tagline {
  font-size: 26rpx;
  color: rgba(255, 255, 255, 0.85);
  margin-top: 12rpx;
}

/* 分区标题 */
.section {
  padding: 30rpx 30rpx 0;
}
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24rpx;
}
.section-title {
  font-size: 32rpx;
  font-weight: 600;
  color: #1a1a1a;
}
.section-more {
  font-size: 24rpx;
  color: #4A90D9;
}

/* 规格网格 */
.spec-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20rpx;
}
.spec-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
  border-radius: 16rpx;
  padding: 28rpx 10rpx 20rpx;
  box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.06);
  transition: transform 0.2s;
  &:active {
    transform: scale(0.96);
  }
}
.spec-icon-wrap {
  width: 88rpx;
  height: 88rpx;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 14rpx;
}
.spec-icon {
  font-size: 40rpx;
}
.spec-name {
  font-size: 28rpx;
  font-weight: 500;
  color: #333;
}
.spec-size {
  font-size: 22rpx;
  color: #999;
  margin-top: 4rpx;
}

/* CTA 按钮 */
.cta-section {
  padding: 40rpx 30rpx 10rpx;
}
.cta-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 96rpx;
  background: linear-gradient(135deg, #4A90D9 0%, #357ABD 100%);
  border-radius: 48rpx;
  border: none;
  box-shadow: 0 8rpx 24rpx rgba(74, 144, 217, 0.35);
  &:active {
    opacity: 0.9;
  }
}
.cta-icon {
  font-size: 36rpx;
  margin-right: 12rpx;
}
.cta-text {
  font-size: 34rpx;
  font-weight: 600;
  color: #fff;
  letter-spacing: 2rpx;
}

/* 免费次数 */
.free-count-section {
  padding: 30rpx;
}
.free-count-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  border-radius: 16rpx;
  padding: 28rpx 32rpx;
  box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.06);
}
.free-count-left {
  display: flex;
  flex-direction: column;
}
.free-count-label {
  font-size: 28rpx;
  font-weight: 500;
  color: #333;
}
.free-count-tip {
  font-size: 22rpx;
  color: #999;
  margin-top: 6rpx;
}
.free-count-right {
  display: flex;
  align-items: baseline;
}
.free-count-num {
  font-size: 56rpx;
  font-weight: 700;
  color: #4A90D9;
}
.free-count-unit {
  font-size: 24rpx;
  color: #999;
  margin-left: 6rpx;
}

/* 广告区域 */
.ad-section {
  padding: 0 30rpx 20rpx;
}
</style>
