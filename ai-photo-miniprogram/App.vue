<script>
/**
 * App.vue - 应用根组件
 * AI证件照小程序入口
 */
export default {
  onLaunch() {
    console.log('AI证件照小程序启动')
  },
  onShow() {
    console.log('AI证件照小程序显示')
  },
  onHide() {
    console.log('AI证件照小程序隐藏')
  }
}
</script>

<style lang="scss">
/* ========================================
 * 全局样式 - AI证件照小程序
 * 设计规范：现代简洁风格
 * ======================================== */

/* 引入 uni.scss 变量 */
@import './uni.scss';

/* ---- 重置样式 ---- */
page {
  background-color: #F5F7FA;
  color: #333333;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC',
    'Hiragino Sans GB', 'Microsoft YaHei', 'Helvetica Neue', Helvetica, Arial,
    sans-serif;
  font-size: 28rpx;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* ---- 盒模型统一 ---- */
view, text, image, navigator, button, input, textarea, scroll-view {
  box-sizing: border-box;
}

/* ---- 通用工具类 ---- */

/* 主色调文字 */
.text-primary {
  color: #4A90D9;
}

/* 次要文字 */
.text-secondary {
  color: #666666;
}

/* 辅助文字 */
.text-muted {
  color: #999999;
}

/* 危险/警告文字 */
.text-danger {
  color: #E74C3C;
}

/* 成功文字 */
.text-success {
  color: #27AE60;
}

/* ---- Flex 布局工具类 ---- */
.flex {
  display: flex;
}

.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

.flex-between {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.flex-column {
  display: flex;
  flex-direction: column;
}

.flex-wrap {
  flex-wrap: wrap;
}

.flex-1 {
  flex: 1;
}

/* ---- 间距工具类 ---- */
.mt-sm { margin-top: 16rpx; }
.mt-md { margin-top: 24rpx; }
.mt-lg { margin-top: 32rpx; }
.mt-xl { margin-top: 48rpx; }

.mb-sm { margin-bottom: 16rpx; }
.mb-md { margin-bottom: 24rpx; }
.mb-lg { margin-bottom: 32rpx; }
.mb-xl { margin-bottom: 48rpx; }

.mx-auto { margin-left: auto; margin-right: auto; }

.p-sm { padding: 16rpx; }
.p-md { padding: 24rpx; }
.p-lg { padding: 32rpx; }

/* ---- 圆角工具类 ---- */
.rounded-sm { border-radius: 8rpx; }
.rounded-md { border-radius: 16rpx; }
.rounded-lg { border-radius: 24rpx; }
.rounded-full { border-radius: 50%; }

/* ---- 阴影工具类 ---- */
.shadow-sm {
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.06);
}

.shadow-md {
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.1);
}

.shadow-lg {
  box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.12);
}

/* ---- 按钮样式 ---- */
.btn-primary {
  background: linear-gradient(135deg, #4A90D9, #357ABD);
  color: #ffffff;
  border: none;
  border-radius: 16rpx;
  padding: 24rpx 48rpx;
  font-size: 30rpx;
  font-weight: 500;
  text-align: center;
  transition: opacity 0.2s;

  &:active {
    opacity: 0.85;
  }

  &::after {
    border: none;
  }
}

.btn-secondary {
  background: #ffffff;
  color: #4A90D9;
  border: 2rpx solid #4A90D9;
  border-radius: 16rpx;
  padding: 24rpx 48rpx;
  font-size: 30rpx;
  font-weight: 500;
  text-align: center;
  transition: opacity 0.2s;

  &:active {
    opacity: 0.85;
  }

  &::after {
    border: none;
  }
}

/* ---- 卡片样式 ---- */
.card {
  background: #ffffff;
  border-radius: 16rpx;
  padding: 32rpx;
  margin: 0 24rpx 24rpx;
  box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.06);
}

/* ---- 安全区域适配 ---- */
.safe-area-bottom {
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
}

/* ---- 文字省略 ---- */
.ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.ellipsis-2 {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>
