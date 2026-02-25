<template>
  <!-- 拍照/选照片页面 -->
  <view class="page">
    <!-- 顶部导航标题 -->
    <view class="nav-bar">
      <text class="nav-title">选择照片</text>
    </view>

    <!-- 照片预览区域 -->
    <view class="preview-area">
      <view v-if="!selectedImage" class="preview-placeholder" @tap="showActionSheet">
        <text class="placeholder-icon">📷</text>
        <text class="placeholder-text">点击选择或拍摄照片</text>
        <text class="placeholder-tip">建议正面免冠、光线充足</text>
      </view>
      <view v-else class="preview-image-wrap">
        <image class="preview-image" :src="selectedImage" mode="aspectFit" @tap="showActionSheet" />
        <view class="preview-change" @tap="showActionSheet">
          <text class="change-text">重新选择</text>
        </view>
      </view>
    </view>

    <!-- 拍照 / 从相册选择 -->
    <view class="upload-options">
      <view class="upload-btn" @tap="takePhoto">
        <view class="upload-icon-wrap camera">
          <text class="upload-icon">📸</text>
        </view>
        <text class="upload-label">拍照</text>
      </view>
      <view class="upload-btn" @tap="chooseFromAlbum">
        <view class="upload-icon-wrap album">
          <text class="upload-icon">🖼️</text>
        </view>
        <text class="upload-label">从相册选择</text>
      </view>
    </view>

    <!-- 照片规格选择 -->
    <view class="section">
      <text class="section-title">照片规格</text>
      <photo-spec :selected="selectedSpec" @change="onSpecChange" />
    </view>

    <!-- 背景颜色选择 -->
    <view class="section">
      <text class="section-title">背景颜色</text>
      <view class="color-picker">
        <view
          v-for="color in bgColors"
          :key="color.value"
          class="color-item"
          :class="{ active: selectedBgColor === color.value }"
          @tap="selectBgColor(color.value)"
        >
          <view class="color-circle" :style="{ background: color.hex }">
            <text v-if="selectedBgColor === color.value" class="color-check">✓</text>
          </view>
          <text class="color-label">{{ color.name }}</text>
        </view>
      </view>
      <!-- 自定义颜色输入 -->
      <view v-if="selectedBgColor === 'custom'" class="custom-color">
        <text class="custom-label">自定义色值：</text>
        <input
          class="custom-input"
          v-model="customColor"
          placeholder="#FFFFFF"
          maxlength="7"
        />
        <view class="custom-preview" :style="{ background: customColor }"></view>
      </view>
    </view>

    <!-- 开始处理按钮 -->
    <view class="bottom-action">
      <button
        class="process-btn"
        :class="{ disabled: !canProcess }"
        :disabled="!canProcess"
        @tap="startProcess"
      >
        开始处理
      </button>
    </view>
  </view>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import photoSpec from '@/components/photo-spec/photo-spec.vue'

// 页面参数
const selectedImage = ref('')
const selectedSpec = ref('')
const selectedBgColor = ref('white')
const customColor = ref('#FFFFFF')

// 背景颜色选项
const bgColors = ref([
  { name: '白底', value: 'white', hex: '#FFFFFF' },
  { name: '蓝底', value: 'blue', hex: '#438EDB' },
  { name: '红底', value: 'red', hex: '#D03D33' },
  { name: '自定义', value: 'custom', hex: 'linear-gradient(135deg, #ff0 0%, #0ff 50%, #f0f 100%)' },
])

// 是否可以开始处理
const canProcess = computed(() => {
  return selectedImage.value && selectedSpec.value
})

// 页面加载，接收上一页传来的规格参数
onMounted(() => {
  const pages = getCurrentPages()
  const currentPage = pages[pages.length - 1]
  const options = currentPage.$page?.options || currentPage.options || {}
  if (options.specId) {
    selectedSpec.value = options.specId
  }
})

// 显示操作菜单
const showActionSheet = () => {
  uni.showActionSheet({
    itemList: ['拍照', '从相册选择'],
    success: (res) => {
      if (res.tapIndex === 0) takePhoto()
      else chooseFromAlbum()
    },
  })
}

// 拍照
const takePhoto = () => {
  uni.chooseImage({
    count: 1,
    sourceType: ['camera'],
    sizeType: ['compressed'],
    success: (res) => {
      selectedImage.value = res.tempFilePaths[0]
    },
    fail: (err) => {
      console.log('拍照取消或失败', err)
    },
  })
}

// 从相册选择
const chooseFromAlbum = () => {
  uni.chooseImage({
    count: 1,
    sourceType: ['album'],
    sizeType: ['compressed'],
    success: (res) => {
      selectedImage.value = res.tempFilePaths[0]
    },
    fail: (err) => {
      console.log('选择相册取消或失败', err)
    },
  })
}

// 规格变更
const onSpecChange = (spec) => {
  selectedSpec.value = spec.id
}

// 选择背景颜色
const selectBgColor = (value) => {
  selectedBgColor.value = value
}

// 开始处理 - 跳转到处理页
const startProcess = () => {
  if (!canProcess.value) return
  const bgColor = selectedBgColor.value === 'custom' ? customColor.value : selectedBgColor.value
  // 将图片路径存入全局临时变量（URL参数不适合传文件路径）
  getApp().globalData = getApp().globalData || {}
  getApp().globalData.tempImage = selectedImage.value
  uni.navigateTo({
    url: `/pages/processing/processing?specId=${selectedSpec.value}&bgColor=${encodeURIComponent(bgColor)}`,
  })
}
</script>

<style lang="scss" scoped>
.page {
  min-height: 100vh;
  background: #F5F7FA;
  padding-bottom: calc(env(safe-area-inset-bottom) + 140rpx);
}

/* 导航栏 */
.nav-bar {
  padding: 20rpx 30rpx;
  background: #fff;
}
.nav-title {
  font-size: 34rpx;
  font-weight: 600;
  color: #1a1a1a;
}

/* 照片预览区 */
.preview-area {
  margin: 24rpx 30rpx;
  height: 480rpx;
  background: #fff;
  border-radius: 20rpx;
  overflow: hidden;
  box-shadow: 0 2rpx 16rpx rgba(0, 0, 0, 0.06);
}
.preview-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}
.placeholder-icon {
  font-size: 80rpx;
  margin-bottom: 20rpx;
}
.placeholder-text {
  font-size: 30rpx;
  color: #666;
}
.placeholder-tip {
  font-size: 24rpx;
  color: #bbb;
  margin-top: 10rpx;
}
.preview-image-wrap {
  position: relative;
  height: 100%;
}
.preview-image {
  width: 100%;
  height: 100%;
}
.preview-change {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 64rpx;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
}
.change-text {
  font-size: 26rpx;
  color: #fff;
}

/* 上传选项 */
.upload-options {
  display: flex;
  justify-content: center;
  gap: 60rpx;
  padding: 30rpx 0;
}
.upload-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  &:active { opacity: 0.7; }
}
.upload-icon-wrap {
  width: 100rpx;
  height: 100rpx;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12rpx;
  &.camera { background: rgba(74, 144, 217, 0.12); }
  &.album { background: rgba(82, 196, 26, 0.12); }
}
.upload-icon {
  font-size: 44rpx;
}
.upload-label {
  font-size: 26rpx;
  color: #555;
}

/* 分区 */
.section {
  margin: 20rpx 30rpx;
  background: #fff;
  border-radius: 16rpx;
  padding: 28rpx;
  box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.05);
}
.section-title {
  font-size: 30rpx;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 20rpx;
  display: block;
}

/* 颜色选择器 */
.color-picker {
  display: flex;
  gap: 30rpx;
}
.color-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  &.active .color-circle {
    box-shadow: 0 0 0 4rpx #4A90D9;
  }
}
.color-circle {
  width: 72rpx;
  height: 72rpx;
  border-radius: 50%;
  border: 2rpx solid #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8rpx;
}
.color-check {
  font-size: 30rpx;
  color: #4A90D9;
  font-weight: 700;
}
.color-label {
  font-size: 24rpx;
  color: #666;
}

/* 自定义颜色 */
.custom-color {
  display: flex;
  align-items: center;
  margin-top: 20rpx;
  gap: 16rpx;
}
.custom-label {
  font-size: 26rpx;
  color: #666;
  white-space: nowrap;
}
.custom-input {
  flex: 1;
  height: 64rpx;
  border: 2rpx solid #ddd;
  border-radius: 12rpx;
  padding: 0 16rpx;
  font-size: 28rpx;
  color: #333;
}
.custom-preview {
  width: 64rpx;
  height: 64rpx;
  border-radius: 12rpx;
  border: 2rpx solid #e0e0e0;
}

/* 底部操作按钮 */
.bottom-action {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20rpx 30rpx calc(env(safe-area-inset-bottom) + 20rpx);
  background: #fff;
  box-shadow: 0 -2rpx 12rpx rgba(0, 0, 0, 0.06);
}
.process-btn {
  height: 92rpx;
  line-height: 92rpx;
  background: linear-gradient(135deg, #4A90D9 0%, #357ABD 100%);
  color: #fff;
  font-size: 34rpx;
  font-weight: 600;
  border-radius: 46rpx;
  border: none;
  letter-spacing: 2rpx;
  &.disabled {
    opacity: 0.5;
  }
  &:active {
    opacity: 0.85;
  }
}
</style>
