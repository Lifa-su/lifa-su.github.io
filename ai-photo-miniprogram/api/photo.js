/**
 * 照片处理相关 API
 */
import { post, get, upload } from '@/utils/request'

/**
 * 上传原始照片到服务器
 * @param {string} filePath - 本地临时文件路径（拍照/相册选取）
 * @returns {Promise<{photoUrl: string}>} 上传后的服务端 URL
 */
export function uploadPhoto(filePath) {
  return upload('/api/photo/upload', filePath, 'photo')
}

/**
 * 提交 AI 证件照处理任务
 * @param {object} params
 * @param {string} params.photoUrl - 已上传的照片 URL
 * @param {string} params.specId - 照片规格 ID（如 '1inch', '2inch'）
 * @param {string} params.bgColor - 背景色（如 '#FFFFFF', '#438EDB'）
 * @returns {Promise<{taskId: string}>} 处理任务 ID
 */
export function processPhoto({ photoUrl, specId, bgColor }) {
  return post('/api/photo/process', { photoUrl, specId, bgColor })
}

/**
 * 查询处理任务状态
 * @param {string} taskId - 任务 ID
 * @returns {Promise<{status: string, progress: number}>}
 *   status: 'pending' | 'processing' | 'completed' | 'failed'
 */
export function getProcessingStatus(taskId) {
  return get(`/api/photo/status/${taskId}`)
}

/**
 * 获取处理完成的照片结果
 * @param {string} taskId - 任务 ID
 * @returns {Promise<{photoUrl: string, thumbUrl: string}>} 标清结果
 */
export function getPhotoResult(taskId) {
  return get(`/api/photo/result/${taskId}`)
}

/**
 * 下载高清版本（需要付费或观看广告解锁）
 * @param {string} taskId - 任务 ID
 * @returns {Promise<{hdUrl: string}>} 高清照片下载链接
 */
export function downloadHD(taskId) {
  return post(`/api/photo/download-hd/${taskId}`)
}
