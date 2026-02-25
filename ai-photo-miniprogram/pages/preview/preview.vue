<template>
  <!-- 预览与下载页面 -->
  <view class="page">
    <!-- 照片规格信息 -->
    <view class="spec-info-bar">
      <text class="spec-info-text">{{ specName }}</text>
      <text class="spec-info-size">{{ specSize }} · {{ bgColorName }}背景</text>
    </view>

    <!-- 前后对比区域 -->
    <view class="compare-section">
      <view class="compare-card">
        <text class="compare-label">原图</text>
        <image class="compare-image" :src="originalImage" mode="aspectFit" />
      </view>
      <view class="compare-arrow">→</view>
      <view class="compare-card">
        <text class="compare-label">效果图</text>
        <view class="processed-wrap">
          <image class="compare-image" :src="processedImage" mode="aspectFit" />
          <!-- 水印覆盖层 -->
          <watermark v-if="showWatermark" />
        </view>
      </view>
    </view>

    <!-- 操作按钮组 -->
    <view class="action-section">
      <!-- 免费下载（低清+水印） -->
      <button class="action-btn free-btn" @tap="downloadFree">
        <text class="btn-icon">⬇️</text>
        <view class="btn-text-wrap">
          <text class="btn-main-text">免费下载</text>
          <text class="btn-sub-text">低清 + 水印</text>
        </view>
      </button>

      <!-- 看广告下载高清 -->
      <button class="action-btn ad-btn" @tap="downloadWithAd">
        <text class="btn-icon">🎬</text>
        <view class="btn-text-wrap">
          <text class="btn-main-text">看广告下载高清</text>
          <text class="btn-sub-text">观看15秒视频广告</text>
        </view>
      </button>

      <!-- 付费下载 -->
      <button class="action-btn pay-btn" @tap="downloadWithPay">
        <text class="btn-icon">👑</text>
        <view class="btn-text-wrap">
          <text class="btn-main-text">付费下载</text>
          <text class="btn-sub-text">¥1.9 无水印高清</text>
        </view>
      </button>
    </view>

    <!-- 分享按钮 -->
    <view class="share-section">
      <button class="share-btn" open-type="share">
        <text class="share-icon">📤</text>
        <text class="share-text">分享给朋友</text>
      </button>
    </view>

    <!-- 广告组件（隐藏，用于触发激励视频） -->
    <ad-reward ref="adRewardRef" @reward="onAdReward" />
  </view>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import watermark from '@/components/watermark/watermark.vue'
import adReward from '@/components/ad-reward/ad-reward.vue'
import { getSpecInfo } from '@/api/photo'

// 页面数据
const originalImage = ref('')
const processedImage = ref('')
const specId = ref('')
const bgColor = ref('white')
const showWatermark = ref(true)
const adRewardRef = ref(null)

// 规格信息
const specName = ref('一寸照')
const specSize = ref('25×35mm')

// 背景颜色中文名
const bgColorName = computed(() => {
  const map = { white: '白', blue: '蓝', red: '红' }
  return map[bgColor.value] || '自定义'
})

// 页面加载
onMounted(() => {
  const pages = getCurrentPages()
  const currentPage = pages[pages.length - 1]
  const options = currentPage.$page?.options || currentPage.options || {}

  specId.value = options.specId || ''
  bgColor.value = decodeURIComponent(options.bgColor || 'white')

  // 从全局获取图片
  const app = getApp()
  originalImage.value = app.globalData?.tempImage || ''
  processedImage.value = app.globalData?.processedImage || originalImage.value

  // 获取规格详情
  loadSpecInfo()
})

// 加载规格信息
const loadSpecInfo = async () => {
  try {
    const info = await getSpecInfo(specId.value)
    if (info) {
      specName.value = info.name || specName.value
      specSize.value = info.size || specSize.value
    }
  } catch (e) {
    console.log('获取规格信息失败', e)
  }
}

// 免费下载（低清+水印）
const downloadFree = () => {
  saveToAlbum(processedImage.value, true)
}

// 看广告下载高清
const downloadWithAd = () => {
  if (adRewardRef.value && adRewardRef.value.showAd) {
    adRewardRef.value.showAd()
  } else {
    uni.showToast({ title: '广告加载中，请稍后再试', icon: 'none' })
  }
}

// 广告观看完成回调
const onAdReward = () => {
  showWatermark.value = false
  uni.showToast({ title: '已解锁高清无水印', icon: 'success' })
  setTimeout(() => {
    saveToAlbum(processedImage.value, false)
  }, 800)
}

// 付费下载（微信支付）
const downloadWithPay = () => {
  // 调用微信支付
  wx.requestPayment({
    timeStamp: '',
    nonceStr: '',
    package: '',
    signType: 'MD5',
    paySign: '',
    success: () => {
      showWatermark.value = false
      uni.showToast({ title: '支付成功', icon: 'success' })
      setTimeout(() => {
        saveToAlbum(processedImage.value, false)
      }, 800)
    },
    fail: (err) => {
      if (err.errMsg !== 'requestPayment:fail cancel') {
        uni.showToast({ title: '支付失败，请重试', icon: 'none' })
      }
    },
  })
}

// 保存到相册
const saveToAlbum = (imagePath, isLowRes) => {
  uni.saveImageToPhotosAlbum({
    filePath: imagePath,
    success: () => {
      const msg = isLowRes ? '低清版已保存到相册' : '高清版已保存到相册'
      uni.showToast({ title: msg, icon: 'success' })
    },
    fail: (err) => {
      // 处理权限拒绝
      if (err.errMsg.includes('auth deny') || err.errMsg.includes('authorize')) {
        uni.showModal({
          title: '提示',
          content: '需要您授权保存到相册的权限',
          confirmText: '去设置',
          success: (res) => {
            if (res.confirm) uni.openSetting()
          },
        })
      } else {
        uni.showToast({ title: '保存失败', icon: 'none' })
      }
    },
  })
}

// 分享配置
onShareAppMessage(() => {
  return {
    title: 'AI证件照 - 一键生成标准证件照',
    path: '/pages/index/index',
    imageUrl: processedImage.value,
  }
})
</script>

<style lang="scss" scoped>
.page {
  min-height: 100vh;
  background: #F5F7FA;
  padding-bottom: calc(env(safe-area-inset-bottom) + 30rpx);
}

/* 规格信息栏 */
.spec-info-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20rpx 30rpx;
  background: #fff;
  border-bottom: 1rpx solid #f0f0f0;
}
.spec-info-text {
  font-size: 30rpx;
  font-weight: 600;
  color: #1a1a1a;
}
.spec-info-size {
  font-size: 24rpx;
  color: #999;
}

/* 前后对比 */
.compare-section {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30rpx 20rpx;
  gap: 16rpx;
}
.compare-card {
  flex: 1;
  background: #fff;
  border-radius: 16rpx;
  overflow: hidden;
  box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.06);
}
.compare-label {
  display: block;
  text-align: center;
  font-size: 24rpx;
  color: #999;
  padding: 16rpx 0 8rpx;
}
.compare-image {
  width: 100%;
  height: 400rpx;
}
.processed-wrap {
  position: relative;
}
.compare-arrow {
  font-size: 36rpx;
  color: #4A90D9;
  font-weight: 700;
  flex-shrink: 0;
}

/* 操作按钮 */
.action-section {
  padding: 10rpx 30rpx;
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}
.action-btn {
  display: flex;
  align-items: center;
  height: 110rpx;
  border-radius: 16rpx;
  padding: 0 30rpx;
  border: none;
  &::after { border: none; }
}
.btn-icon {
  font-size: 40rpx;
  margin-right: 20rpx;
}
.btn-text-wrap {
  display: flex;
  flex-direction: column;
}
.btn-main-text {
  font-size: 30rpx;
  font-weight: 600;
}
.btn-sub-text {
  font-size: 22rpx;
  margin-top: 4rpx;
}

/* 免费下载 */
.free-btn {
  background: #fff;
  box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.06);
  .btn-main-text { color: #333; }
  .btn-sub-text { color: #999; }
}

/* 广告下载 */
.ad-btn {
  background: linear-gradient(135deg, #FFA940 0%, #FF7A00 100%);
  .btn-main-text { color: #fff; }
  .btn-sub-text { color: rgba(255, 255, 255, 0.8); }
}

/* 付费下载 */
.pay-btn {
  background: linear-gradient(135deg, #4A90D9 0%, #357ABD 100%);
  .btn-main-text { color: #fff; }
  .btn-sub-text { color: rgba(255, 255, 255, 0.8); }
}

/* 分享按钮 */
.share-section {
  padding: 20rpx 30rpx;
}
.share-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 88rpx;
  background: #fff;
  border-radius: 44rpx;
  border: 2rpx solid #E8EDF2;
  &::after { border: none; }
}
.share-icon {
  font-size: 32rpx;
  margin-right: 10rpx;
}
.share-text {
  font-size: 28rpx;
  color: #666;
}
</style>
