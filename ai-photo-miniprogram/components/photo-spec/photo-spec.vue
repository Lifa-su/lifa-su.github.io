<!--
  照片规格选择器
  展示证件照尺寸列表，支持选中高亮
-->
<template>
  <view class="photo-spec">
    <view
      v-for="item in specs"
      :key="item.id"
      class="spec-item"
      :class="{ 'spec-item--active': selectedSpec && selectedSpec.id === item.id }"
      @click="handleSelect(item)"
    >
      <view class="spec-item__header">
        <text class="spec-item__name">{{ item.name }}</text>
        <text class="spec-item__size">{{ item.width }}×{{ item.height }}mm</text>
      </view>
      <text class="spec-item__usage">{{ item.usage }}</text>
    </view>
  </view>
</template>

<script setup>
/**
 * 照片规格选择组件
 * 以网格形式展示各种证件照规格，点击选中
 */

const props = defineProps({
  /** 规格列表 [{ id, name, width, height, usage }] */
  specs: {
    type: Array,
    default: () => [
      { id: '1inch', name: '一寸', width: 25, height: 35, usage: '考研报名、英语考试' },
      { id: '2inch', name: '二寸', width: 35, height: 49, usage: '护照签证、驾照' },
      { id: 'small2inch', name: '小二寸', width: 33, height: 48, usage: '公务员考试、身份证' },
      { id: 'big1inch', name: '大一寸', width: 33, height: 48, usage: '计算机等级考试' },
      { id: '5inch', name: '五寸', width: 89, height: 127, usage: '生活照打印' },
    ],
  },
  /** 当前选中的规格 */
  selectedSpec: {
    type: Object,
    default: null,
  },
})

const emit = defineEmits(['select'])

function handleSelect(spec) {
  emit('select', spec)
}
</script>

<style scoped lang="scss">
.photo-spec {
  display: flex;
  flex-wrap: wrap;
  gap: 20rpx;
  padding: 20rpx 0;
}

.spec-item {
  width: calc(50% - 10rpx);
  padding: 24rpx;
  background: #f8f8f8;
  border-radius: 16rpx;
  border: 2rpx solid transparent;
  box-sizing: border-box;
  transition: all 0.2s;

  &--active {
    background: #eef5ff;
    border-color: #4a90d9;
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8rpx;
  }

  &__name {
    font-size: 30rpx;
    font-weight: 600;
    color: #333;
  }

  &__size {
    font-size: 24rpx;
    color: #888;
  }

  &__usage {
    font-size: 22rpx;
    color: #aaa;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
