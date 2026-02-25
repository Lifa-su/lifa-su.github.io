<template>
  <!-- AI处理页面 - 展示处理进度 -->
  <view class="page">
    <view class="processing-container">
      <!-- 旋转动画环 -->
      <view class="ring-wrap">
        <view class="ring"></view>
        <view class="ring-inner">
          <text class="progress-num">{{ progress }}%</text>
        </view>
      </view>

      <!-- 处理提示文字 -->
      <text class="processing-title">AI 正在处理您的照片</text>
      <text class="processing-tip">请稍候，预计需要 10-15 秒</text>

      <!-- 步骤指示器 -->
      <view class="steps">
        <view
          v-for="(step, index) in steps"
          :key="index"
          class="step-item"
          :class="{ active: currentStep >= index, done: currentStep > index }"
        >
          <view class="step-dot">
            <text v-if="currentStep > index" class="step-check">✓</text>
            <view v-else-if="currentStep === index" class="step-pulse"></view>
          </view>
          <text class="step-label">{{ step }}</text>
          <!-- 连接线 -->
          <view v-if="index < steps.length - 1" class="step-line" :class="{ filled: currentStep > index }"></view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { processPhoto } from '@/api/photo'

// 处理进度
const progress = ref(0)
const currentStep = ref(0)

// 步骤列表
const steps = ['人脸检测', '智能抠图', '背景替换', '美颜优化']

// 页面参数
let specId = ''
let bgColor = ''
let tempImage = ''
let timer = null

onMounted(() => {
  // 获取页面参数
  const pages = getCurrentPages()
  const currentPage = pages[pages.length - 1]
  const options = currentPage.$page?.options || currentPage.options || {}
  specId = options.specId || ''
  bgColor = decodeURIComponent(options.bgColor || 'white')

  // 从全局获取临时图片路径
  const app = getApp()
  tempImage = app.globalData?.tempImage || ''

  // 开始模拟处理流程
  startProcessing()
})

onUnmounted(() => {
  if (timer) clearTimeout(timer)
})

// 模拟处理流程（演示用 setTimeout 推进步骤）
const startProcessing = async () => {
  // 步骤1: 人脸检测 0-25%
  await animateProgress(0, 25, 1500)
  currentStep.value = 1

  // 步骤2: 智能抠图 25-55%
  await animateProgress(25, 55, 2000)
  currentStep.value = 2

  // 步骤3: 背景替换 55-80%
  await animateProgress(55, 80, 1500)
  currentStep.value = 3

  // 调用实际API处理（如果可用）
  let resultImage = ''
  try {
    const res = await processPhoto({
      image: tempImage,
      specId,
      bgColor,
    })
    resultImage = res?.resultImage || ''
  } catch (e) {
    console.log('API调用失败，使用模拟结果', e)
    // 模拟结果图片路径
    resultImage = tempImage
  }

  // 步骤4: 美颜优化 80-100%
  await animateProgress(80, 100, 1200)
  currentStep.value = 4

  // 存储结果并跳转预览页
  const app = getApp()
  app.globalData = app.globalData || {}
  app.globalData.processedImage = resultImage || tempImage

  setTimeout(() => {
    uni.redirectTo({
      url: `/pages/preview/preview?specId=${specId}&bgColor=${encodeURIComponent(bgColor)}`,
    })
  }, 500)
}

// 动画推进进度条
const animateProgress = (from, to, duration) => {
  return new Promise((resolve) => {
    const totalSteps = to - from
    const interval = duration / totalSteps
    let current = from
    const tick = () => {
      if (current >= to) {
        progress.value = to
        resolve()
        return
      }
      current++
      progress.value = current
      timer = setTimeout(tick, interval)
    }
    tick()
  })
}
</script>

<style lang="scss" scoped>
.page {
  min-height: 100vh;
  background: #F5F7FA;
  display: flex;
  align-items: center;
  justify-content: center;
}

.processing-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60rpx 40rpx;
}

/* 旋转环动画 */
.ring-wrap {
  position: relative;
  width: 240rpx;
  height: 240rpx;
  margin-bottom: 48rpx;
}
.ring {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 8rpx solid #E8EDF2;
  border-top-color: #4A90D9;
  border-right-color: #4A90D9;
  animation: spin 1.2s linear infinite;
}
@keyframes spin {
  to { transform: rotate(360deg); }
}
.ring-inner {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
}
.progress-num {
  font-size: 48rpx;
  font-weight: 700;
  color: #4A90D9;
}

/* 提示文字 */
.processing-title {
  font-size: 34rpx;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 12rpx;
}
.processing-tip {
  font-size: 26rpx;
  color: #999;
  margin-bottom: 60rpx;
}

/* 步骤指示器 */
.steps {
  display: flex;
  align-items: flex-start;
  width: 100%;
  padding: 0 20rpx;
}
.step-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  position: relative;
}
.step-dot {
  width: 48rpx;
  height: 48rpx;
  border-radius: 50%;
  background: #E8EDF2;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12rpx;
  transition: background 0.3s;
}
.step-item.active .step-dot {
  background: #4A90D9;
}
.step-item.done .step-dot {
  background: #52C41A;
}
.step-check {
  color: #fff;
  font-size: 24rpx;
  font-weight: 700;
}
.step-pulse {
  width: 16rpx;
  height: 16rpx;
  border-radius: 50%;
  background: #fff;
  animation: pulse 1s ease-in-out infinite;
}
@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.4); opacity: 0.6; }
}
.step-label {
  font-size: 22rpx;
  color: #bbb;
  text-align: center;
  transition: color 0.3s;
}
.step-item.active .step-label {
  color: #4A90D9;
  font-weight: 500;
}
.step-item.done .step-label {
  color: #52C41A;
}

/* 步骤连接线 */
.step-line {
  position: absolute;
  top: 24rpx;
  left: calc(50% + 28rpx);
  width: calc(100% - 56rpx);
  height: 4rpx;
  background: #E8EDF2;
  transition: background 0.3s;
}
.step-line.filled {
  background: #52C41A;
}
</style>
