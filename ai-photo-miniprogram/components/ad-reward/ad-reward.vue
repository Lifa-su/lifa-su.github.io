<!--
  激励视频广告组件
  用于观看广告解锁高清下载等功能
-->
<template>
  <view class="ad-reward">
    <button
      class="ad-btn"
      :class="{ 'ad-btn--disabled': disabled || !adReady }"
      :disabled="disabled || loading"
      @click="handleShowAd"
    >
      <text v-if="loading" class="ad-btn__loading">加载中...</text>
      <text v-else-if="!adReady" class="ad-btn__text">广告暂不可用</text>
      <text v-else class="ad-btn__text">{{ buttonText }}</text>
    </button>
  </view>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

// Props 定义
const props = defineProps({
  /** 广告单元 ID */
  adUnitId: {
    type: String,
    required: true,
  },
  /** 按钮文案 */
  buttonText: {
    type: String,
    default: '观看广告免费解锁',
  },
  /** 是否禁用 */
  disabled: {
    type: Boolean,
    default: false,
  },
})

// 事件
const emit = defineEmits(['reward', 'error', 'close'])

// 状态
const adReady = ref(false)
const loading = ref(false)
let adInstance = null

/**
 * 创建并初始化广告实例
 */
function initAd() {
  // #ifdef MP-WEIXIN
  if (!wx.createRewardedVideoAd) {
    console.warn('[ad-reward] 当前环境不支持激励视频广告')
    return
  }

  adInstance = wx.createRewardedVideoAd({
    adUnitId: props.adUnitId,
  })

  // 广告加载成功
  adInstance.onLoad(() => {
    adReady.value = true
    loading.value = false
  })

  // 广告加载失败
  adInstance.onError((err) => {
    console.warn('[ad-reward] 广告加载失败:', err)
    adReady.value = false
    loading.value = false
    emit('error', err)
  })

  // 广告关闭回调
  adInstance.onClose((res) => {
    if (res && res.isEnded) {
      // 用户完整观看，发放奖励
      emit('reward')
    } else {
      // 中途关闭
      emit('close')
    }
  })

  // 预加载
  loading.value = true
  adInstance.load().catch(() => {
    loading.value = false
  })
  // #endif
}

/**
 * 展示广告
 */
function handleShowAd() {
  if (!adInstance || props.disabled) return

  loading.value = true
  adInstance.show().catch(() => {
    // show 失败，尝试重新加载后再展示
    adInstance
      .load()
      .then(() => adInstance.show())
      .catch((err) => {
        loading.value = false
        uni.showToast({ title: '广告加载失败，请稍后重试', icon: 'none' })
        emit('error', err)
      })
  }).finally(() => {
    loading.value = false
  })
}

/**
 * 外部调用：主动展示广告
 */
function showAd() {
  handleShowAd()
}

// 暴露方法给父组件
defineExpose({ showAd })

onMounted(() => {
  initAd()
})

onBeforeUnmount(() => {
  // 清理广告实例事件（微信基础库会自动回收实例）
  adInstance = null
})
</script>

<style scoped lang="scss">
.ad-reward {
  display: flex;
  justify-content: center;
}

.ad-btn {
  width: 100%;
  height: 88rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #ff9a56, #ff6a00);
  color: #fff;
  font-size: 30rpx;
  font-weight: 500;
  border-radius: 44rpx;
  border: none;

  &--disabled {
    background: #ccc;
    color: #999;
  }

  &__loading {
    font-size: 28rpx;
  }

  &__text {
    font-size: 30rpx;
  }
}
</style>
