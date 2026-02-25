<!--
  水印覆盖层组件
  在 slot 内容上叠加半透明对角线 "AI证件照 样品" 水印
-->
<template>
  <view class="watermark-wrapper">
    <slot />
    <view v-if="visible" class="watermark-overlay" />
  </view>
</template>

<script setup>
/**
 * 水印组件
 * 纯 CSS 实现重复对角线水印文字，不影响 slot 内容交互
 */
defineProps({
  /** 是否显示水印 */
  visible: {
    type: Boolean,
    default: true,
  },
})
</script>

<style scoped lang="scss">
.watermark-wrapper {
  position: relative;
  overflow: hidden;
}

.watermark-overlay {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  pointer-events: none;
  z-index: 10;
  background-image: repeating-linear-gradient(
    -45deg,
    transparent,
    transparent 80rpx,
    rgba(0, 0, 0, 0.03) 80rpx,
    rgba(0, 0, 0, 0.03) 82rpx
  );

  /* 利用伪元素实现重复水印文字 */
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  transform: rotate(-30deg);

  /* 用 repeating 背景模拟文字水印 */
  &::before {
    content: 'AI证件照 样品    AI证件照 样品    AI证件照 样品    AI证件照 样品    AI证件照 样品    AI证件照 样品    AI证件照 样品    AI证件照 样品    AI证件照 样品    AI证件照 样品    AI证件照 样品    AI证件照 样品    AI证件照 样品    AI证件照 样品    AI证件照 样品    AI证件照 样品    AI证件照 样品    AI证件照 样品    AI证件照 样品    AI证件照 样品    AI证件照 样品    AI证件照 样品    AI证件照 样品    AI证件照 样品';
    display: block;
    width: 200%;
    font-size: 36rpx;
    color: rgba(0, 0, 0, 0.08);
    font-weight: bold;
    letter-spacing: 20rpx;
    line-height: 160rpx;
    word-break: break-all;
    text-align: center;
    pointer-events: none;
    user-select: none;
  }
}
</style>
